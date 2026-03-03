import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from 'react-responsive'

gsap.registerPlugin(ScrollTrigger)

const VideoPin = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  useGSAP(() => {
    if (!isMobile) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.vd-pin-section',
          start: '-15% top',
          end: '200% top',
          scrub: 2,
          pin: true,
          anticipatePin: 1,
        },
      })
        .to('.video-box', {
          clipPath: 'circle(100% at 50% 50%)',
          ease: 'none',
        })
        .to(
          '.pin-video',
          {
            scale: 1.15,
            ease: 'none',
          },
          '<',
        )
    }

    gsap.to('.spin-circle', {
      rotation: 360,
      duration: 12,
      repeat: -1,
      ease: 'none',
    })

    gsap.from('.vd-pin-section', {
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.vd-pin-section',
        start: 'top 90%',
      },
    })

    gsap.utils.toArray('.vd-label').forEach((label, index) => {
      gsap.from(label, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: index * 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.vd-pin-section',
          start: 'top 50%',
        },
      })
    })
  }, {
    scope: sectionRef,
    dependencies: [isMobile],
    revertOnUpdate: true,
  })

  const handlePlayMove = (event) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (event.clientX - cx) * 0.35
    const dy = (event.clientY - cy) * 0.35
    gsap.to(button, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
  }

  const handlePlayLeave = (event) => {
    gsap.to(event.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' })
  }

  const handleVideoToggle = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <section ref={sectionRef} className="vd-pin-section relative overflow-hidden">
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      <div
        style={{ clipPath: isMobile ? 'circle(100% at 50% 50%)' : 'circle(6% at 50% 50%)' }}
        className="size-full video-box"
      >
        <video
          ref={videoRef}
          className="pin-video"
          src="/videos/pin-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />

        <div className="abs-center md:scale-100 scale-150 z-20">
          <img
            src="/images/circle-text.svg"
            alt="Tap to pause or play"
            className="spin-circle select-none"
          />

          <button
            type="button"
            className="play-btn group"
            onMouseMove={handlePlayMove}
            onMouseLeave={(event) => {
              handlePlayLeave(event)
              setIsHovered(false)
            }}
            onMouseEnter={() => setIsHovered(true)}
            onClick={handleVideoToggle}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            style={{
              transition: 'background 0.3s ease',
              background: isHovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.85)',
            }}
          >
            {isPlaying ? (
              <span className="inline-flex items-center justify-center gap-1 md:w-[2vw] w-5 md:h-[2vw] h-5">
                <span className="block md:h-[1.2vw] h-4 md:w-[0.22vw] w-[3px] rounded bg-[#0b1727]" />
                <span className="block md:h-[1.2vw] h-4 md:w-[0.22vw] w-[3px] rounded bg-[#0b1727]" />
              </span>
            ) : (
              <span
                className="block w-0 h-0 ml-0.5 border-y-[7px] border-y-transparent border-l-[11px] border-l-[#0b1727]"
                aria-hidden="true"
              />
            )}
            <span
              className="absolute inset-0 rounded-full border-2 border-white/60 animate-ping"
              style={{ animationDuration: '2s' }}
            />
          </button>
        </div>
      </div>

      {!isMobile && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 vd-label flex flex-col items-center gap-2">
          <span className="text-white/50 text-xs tracking-[0.3em] uppercase font-medium">
            Scroll to Reveal
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      )}
    </section>
  )
}

export default VideoPin
