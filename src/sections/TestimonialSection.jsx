import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cards } from '../constants'

gsap.registerPlugin(ScrollTrigger)

const CARD_W = 200
const CARD_H = 290
const CARD_GAP = 16

const PILE_OFFSETS = [
  { x: -18, y: 10, r: -14 },
  { x: 22, y: -12, r: 9 },
  { x: -8, y: 18, r: -22 },
  { x: 30, y: 8, r: 16 },
  { x: -25, y: -8, r: -8 },
  { x: 14, y: 22, r: 20 },
  { x: -5, y: -16, r: -11 },
]

const TestimonialSection = ({ id }) => {
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })
  const canHover = useMediaQuery({ query: '(hover: hover) and (pointer: fine)' })

  const wrapRef = useRef(null)
  const pinRef = useRef(null)
  const ctxRef = useRef(null)
  const mobileVideoRefs = useRef([])

  const [hovered, setHovered] = useState(null)
  const [mobileActive, setMobileActive] = useState(null)

  useEffect(() => {
    if (isTablet) return undefined

    const wrap = wrapRef.current
    const pin = pinRef.current
    if (!wrap || !pin) return undefined

    const init = () => {
      const total = cards.length
      const rowW = total * CARD_W + (total - 1) * CARD_GAP
      const originX = window.innerWidth / 2
      const originY = window.innerHeight / 2
      const rowStartX = (window.innerWidth - rowW) / 2
      const rowY = (window.innerHeight - CARD_H) / 2

      const finalPositions = cards.map((_, index) => ({
        x: rowStartX + index * (CARD_W + CARD_GAP),
        y: rowY,
      }))

      cards.forEach((_, index) => {
        const pile = PILE_OFFSETS[index] ?? { x: 0, y: 0, r: 0 }
        gsap.set(`.tcard-${index}`, {
          x: originX - CARD_W / 2 + pile.x * 4,
          y: originY - CARD_H / 2 + pile.y * 4,
          rotate: pile.r,
          opacity: 0,
          scale: 0.88,
          zIndex: index,
        })
      })

      ctxRef.current = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: 'top top',
            end: `+=${total * 340 + 800}px`,
            pin,
            pinSpacing: true,
            scrub: 1.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        timeline
          .to('.tct-1', { x: () => window.innerWidth * 0.35, ease: 'none' }, 0)
          .to('.tct-2', { x: () => -window.innerWidth * 0.12, ease: 'none' }, 0)
          .to('.tct-3', { x: () => window.innerWidth * 0.25, ease: 'none' }, 0)
          .to('.tcard-all', {
            opacity: 1,
            scale: 1,
            stagger: 0.02,
            ease: 'expo.out',
            duration: 0.12,
          }, 0)

        cards.forEach((_, index) => {
          const finalPos = finalPositions[index]
          const at = 0.14 + index * 0.11

          timeline
            .to(`.tcard-${index}`, {
              x: finalPos.x,
              y: finalPos.y,
              rotate: 0,
              scale: 1,
              opacity: 0.88,
              zIndex: 20 + index,
              ease: 'expo.out',
              duration: 0.2,
            }, at)
            .to(`.tcard-${index}`, {
              y: finalPos.y - 12,
              duration: 0.04,
              ease: 'power2.out',
            }, at + 0.2)
            .to(`.tcard-${index}`, {
              y: finalPos.y,
              duration: 0.05,
              ease: 'power3.in',
            }, at + 0.24)
        })
      }, wrap)
    }

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      init()
    })

    const handleResize = () => {
      if (ctxRef.current) ctxRef.current.revert()
      init()
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      if (ctxRef.current) ctxRef.current.revert()
    }
  }, [isTablet])

  const onEnter = (index) => {
    if (!canHover || isTablet) return

    setHovered(index)
    const video = document.querySelector(`.tcard-${index} video`)
    if (video) video.play()

    gsap.to(`.tcard-${index}`, {
      scale: 1.15,
      opacity: 1,
      rotate: 0,
      zIndex: 200,
      duration: 0.45,
      ease: 'expo.out',
    })

    cards.forEach((_, itemIndex) => {
      if (itemIndex === index) return
      gsap.to(`.tcard-${itemIndex}`, {
        opacity: 0.35,
        scale: 0.97,
        duration: 0.35,
        ease: 'power2.out',
      })
    })
  }

  const onLeave = (index) => {
    if (!canHover || isTablet) return

    setHovered(null)
    const video = document.querySelector(`.tcard-${index} video`)
    if (video) video.pause()

    gsap.to(`.tcard-${index}`, {
      scale: 1,
      opacity: 0.88,
      zIndex: 20 + index,
      duration: 0.6,
      ease: 'elastic.out(1, 0.55)',
    })

    cards.forEach((_, itemIndex) => {
      if (itemIndex === index) return
      gsap.to(`.tcard-${itemIndex}`, {
        opacity: 0.88,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
    })
  }

  const onMobileToggle = (index) => {
    const selectedVideo = mobileVideoRefs.current[index]
    if (!selectedVideo) return

    const isSame = mobileActive === index
    mobileVideoRefs.current.forEach((video, itemIndex) => {
      if (!video) return
      if (itemIndex === index && !isSame) video.play()
      else video.pause()
    })

    setMobileActive(isSame ? null : index)
  }

  if (isTablet) {
    return (
      <section id={id} className="bg-milk py-24 overflow-hidden">
        <div className="px-5 md:px-10 mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-dark-brown/55 mb-2">Reviews</p>
          <h2 className="text-5xl md:text-7xl text-dark-brown leading-none">What Everyone Says</h2>
        </div>

        <div className="flex gap-4 overflow-x-auto px-5 md:px-10 pb-2 snap-x snap-mandatory">
          {cards.map((card, index) => (
            <article
              key={card.name}
              className="snap-start shrink-0 w-[75vw] sm:w-[52vw] rounded-[1.4rem] overflow-hidden bg-black relative shadow-[0_14px_36px_rgba(0,0,0,0.3)]"
            >
              <button
                type="button"
                onClick={() => onMobileToggle(index)}
                className="block w-full text-left"
              >
                <video
                  ref={(el) => {
                    mobileVideoRefs.current[index] = el
                  }}
                  src={card.src}
                  muted
                  loop
                  playsInline
                  poster={card.img}
                  className="w-full h-[260px] object-cover"
                />

                <div className="p-4 bg-gradient-to-t from-black via-black/90 to-transparent absolute inset-x-0 bottom-0">
                  <p className="text-white font-bold text-sm">{card.name}</p>
                  <p className="text-white/60 text-[11px]">{card.role}</p>
                  <p className="text-white/80 text-xs mt-2 italic">"{card.quote}"</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/70 mt-3">
                    {mobileActive === index ? 'Tap to Pause' : 'Tap to Play'}
                  </p>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      id={id}
      ref={wrapRef}
      style={{ position: 'relative', width: '100%', background: '#faeade' }}
    >
      <div
        ref={pinRef}
        style={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 1,
          }}
        >
          {[
            { text: "WHAT'S", cls: 'tct-1', color: '#222123' },
            { text: 'EVERYONE', cls: 'tct-2', color: '#c88e64' },
            { text: 'TALKING', cls: 'tct-3', color: '#222123' },
          ].map(({ text, cls, color }) => (
            <span
              key={text}
              className={cls}
              style={{
                display: 'block',
                fontSize: 'clamp(5rem, 16vw, 16rem)',
                fontWeight: 900,
                lineHeight: 0.85,
                color,
                letterSpacing: '-0.04em',
                whiteSpace: 'nowrap',
              }}
            >
              {text}
            </span>
          ))}
        </div>

        {cards.map((card, index) => (
          <div
            key={card.name}
            className={`tcard-all tcard-${index}`}
            onMouseEnter={() => onEnter(index)}
            onMouseLeave={() => onLeave(index)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: CARD_W,
              height: CARD_H,
              borderRadius: 20,
              overflow: 'hidden',
              cursor: canHover ? 'pointer' : 'default',
              zIndex: 10 + index,
              boxShadow: '0 16px 48px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.14)',
              willChange: 'transform, opacity',
              opacity: 0,
            }}
          >
            <video
              src={card.src}
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(250,234,222,0.15)',
                mixBlendMode: 'multiply',
                pointerEvents: 'none',
                opacity: hovered === index ? 0 : 1,
                transition: 'opacity 0.3s ease',
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.08) 50%, transparent 75%)',
                pointerEvents: 'none',
                opacity: hovered === index ? 1 : 0.55,
                transition: 'opacity 0.35s ease',
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px 14px',
                transform: hovered === index ? 'translateY(0)' : 'translateY(10px)',
                opacity: hovered === index ? 1 : 0,
                transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                <img
                  src={card.img}
                  alt={card.name}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid rgba(255,255,255,0.45)',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#fff', fontSize: 13, fontWeight: 800, lineHeight: 1, margin: 0 }}>
                    {card.name}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, margin: '3px 0 0' }}>
                    {card.role}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 1 }}>
                  {[...Array(card.rating ?? 5)].map((_, starIndex) => (
                    <span key={starIndex} style={{ color: '#FBBF24', fontSize: 11 }}>★</span>
                  ))}
                </div>
              </div>
              <p
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: 11,
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                "{card.quote}"
              </p>
            </div>
          </div>
        ))}

        <div
          style={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            opacity: 0.38,
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700 }}>
            scroll
          </span>
          <div style={{ width: 1, height: 36, background: 'currentColor' }} />
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
