import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useNavigate } from 'react-router-dom'
import { openExternal, scrollToSection } from '../utils/scroll'

gsap.registerPlugin(ScrollTrigger, SplitText)

const NAV_LINKS = [
  {
    heading: 'SPYLT Flavors',
    items: [
      { label: 'Chocolate Milk', sectionId: 'flavours' },
      { label: 'Strawberry Milk', sectionId: 'flavours' },
      { label: 'Cookies & Cream', sectionId: 'flavours' },
    ],
  },
  {
    heading: 'Community',
    items: [
      { label: 'Chug Club', sectionId: 'order' },
      { label: 'Student Marketing', href: 'mailto:hello@spyltmilk.com' },
      { label: 'Dairy Dealers', href: 'mailto:sales@spyltmilk.com' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About Us', sectionId: 'about' },
      { label: 'Contacts', sectionId: 'order' },
      { label: 'Tasty Talk', sectionId: 'testimonials' },
    ],
  },
]

const SOCIALS = [
  { src: '/images/yt.svg', label: 'YouTube', href: 'https://www.youtube.com/@SPYLT' },
  { src: '/images/insta.svg', label: 'Instagram', href: 'https://www.instagram.com/spyltmilk' },
  { src: '/images/tiktok.svg', label: 'TikTok', href: 'https://www.tiktok.com/@spyltmilk' },
]

const FooterSection = ({ id }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const sectionRef = useRef(null)
  const emailRef = useRef(null)
  const ctxRef = useRef(null)
  const feedbackTimeoutRef = useRef(null)
  const navigate = useNavigate()

  const [emailFocused, setEmailFocused] = useState(false)
  const [feedback, setFeedback] = useState({ type: 'idle', text: '' })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const init = () => {
      ctxRef.current = gsap.context(() => {
        const tagSplit = SplitText.create('.footer-tag', { type: 'chars' })

        gsap.set(tagSplit.chars, { yPercent: 130, rotateX: -80, opacity: 0 })
        gsap.to(tagSplit.chars, {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          stagger: { amount: 0.65, ease: 'power3.inOut' },
          ease: 'expo.out',
          duration: 1.1,
          scrollTrigger: {
            trigger: '.footer-tag-wrap',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })

        gsap.fromTo(
          '.footer-tag',
          { letterSpacing: '-0.08em' },
          {
            letterSpacing: '-0.02em',
            ease: 'expo.out',
            duration: 1.4,
            delay: 0.3,
            scrollTrigger: {
              trigger: '.footer-tag-wrap',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        )

        gsap.to('.footer-media', {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        })

        gsap.to('.footer-dip', {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: 1.5,
          },
        })

        gsap.set('.social-btn', { scale: 0, opacity: 0, rotation: -20 })
        gsap.to('.social-btn', {
          scale: 1,
          opacity: 1,
          rotation: 0,
          stagger: 0.1,
          ease: 'back.out(2.2)',
          duration: 0.75,
          scrollTrigger: {
            trigger: '.footer-socials',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })

        gsap.set('.footer-col', { opacity: 0, y: 40 })
        gsap.to('.footer-col', {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'expo.out',
          duration: 1,
          scrollTrigger: {
            trigger: '.footer-links',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })

        gsap.set('.footer-link-item', { opacity: 0, x: -12 })
        gsap.to('.footer-link-item', {
          opacity: 1,
          x: 0,
          stagger: 0.04,
          ease: 'expo.out',
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: '.footer-links',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })

        gsap.set('.footer-newsletter', { opacity: 0, x: 60 })
        gsap.to('.footer-newsletter', {
          opacity: 1,
          x: 0,
          ease: 'expo.out',
          duration: 1.1,
          scrollTrigger: {
            trigger: '.footer-newsletter',
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        })

        gsap.set('.copyright-box', { opacity: 0, y: 12 })
        gsap.to('.copyright-box', {
          opacity: 1,
          y: 0,
          ease: 'expo.out',
          duration: 0.9,
          scrollTrigger: {
            trigger: '.copyright-box',
            start: 'top 97%',
            toggleActions: 'play none none none',
          },
        })

        gsap.to('.footer-arrow-btn', {
          scale: 1.1,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1,
        })
      }, section)
    }

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      init()
    })

    return () => {
      cancelAnimationFrame(rafId)
      if (ctxRef.current) ctxRef.current.revert()
    }
  }, [])

  useEffect(() => () => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current)
  }, [])

  const onSocialEnter = (event) => {
    gsap.to(event.currentTarget, {
      scale: 1.22,
      rotation: 10,
      duration: 0.3,
      ease: 'back.out(2)',
    })
  }

  const onSocialLeave = (event) => {
    gsap.to(event.currentTarget, {
      scale: 1,
      rotation: 0,
      duration: 0.55,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  const onArrowEnter = (event) => {
    gsap.to(event.currentTarget, { x: 5, duration: 0.3, ease: 'power2.out' })
  }

  const onArrowLeave = (event) => {
    gsap.to(event.currentTarget, { x: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  }

  const onLinkEnter = (event) => {
    const line = event.currentTarget.querySelector('.link-line')
    if (line) gsap.to(line, { scaleX: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(event.currentTarget, { x: 4, duration: 0.3, ease: 'power2.out' })
  }

  const onLinkLeave = (event) => {
    const line = event.currentTarget.querySelector('.link-line')
    if (line) gsap.to(line, { scaleX: 0, duration: 0.25, ease: 'power2.in', transformOrigin: 'right' })
    gsap.to(event.currentTarget, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
  }

  const handleFooterLink = (item) => {
    if (item.sectionId) {
      scrollToSection(item.sectionId)
      return
    }
    if (item.href) {
      openExternal(item.href)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const email = emailRef.current?.value?.trim() ?? ''
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!email) {
      setFeedback({ type: 'error', text: 'Enter an email address first.' })
      return
    }

    if (!isValidEmail) {
      setFeedback({ type: 'error', text: 'Please enter a valid email format.' })
      return
    }

    gsap.to('.footer-arrow-btn', {
      rotation: 360,
      duration: 0.5,
      ease: 'expo.out',
      onComplete: () => gsap.set('.footer-arrow-btn', { rotation: 0 }),
    })

    setFeedback({ type: 'success', text: "You're on the list. Check your inbox soon." })
    if (emailRef.current) emailRef.current.value = ''

    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current)
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback({ type: 'idle', text: '' })
    }, 3000)
  }

  return (
    <section id={id} ref={sectionRef} className="footer-section">
        <img
          src="/images/footer-dip.png"
          alt="Curved section divider"
          className="footer-dip w-full object-cover -translate-y-1"
        />

        <div className="2xl:h-[110dvh] relative pt-[10vh]">
          {isMobile ? (
            <img
              src="/images/footer-drink.png"
              className="footer-media absolute top-0 w-full object-contain pointer-events-none"
              alt="Splash visual"
            />
          ) : (
            <video
              src="/videos/splash.mp4"
              autoPlay
              playsInline
              muted
              loop
              className="footer-media absolute top-0 w-full object-contain mix-blend-lighten pointer-events-none"
            />
          )}

          <div
            className="footer-tag-wrap overflow-hidden relative z-10"
            style={{ perspective: '1000px' }}
          >
            <h1
              className="footer-tag general-title text-center text-milk py-5"
              style={{ letterSpacing: '-0.08em' }}
            >
              #CHUGRESPONSIBLY
            </h1>
          </div>

          <div className="footer-socials flex justify-center items-center gap-6 relative z-10 md:mt-10 mt-5">
            {SOCIALS.map(({ src, label, href }) => (
              <button
                key={label}
                type="button"
                className="social-btn cursor-pointer p-3 rounded-full border border-white/15 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10"
                onMouseEnter={onSocialEnter}
                onMouseLeave={onSocialLeave}
                onClick={() => openExternal(href)}
                aria-label={`Open ${label}`}
              >
                <img src={src} alt={label} className="w-6 h-6" />
              </button>
            ))}
          </div>

          <div className="footer-links mt-32 md:mt-40 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph">
            <div className="flex items-start md:gap-16 gap-8">
              {NAV_LINKS.map((group) => (
                <div key={group.heading} className="footer-col flex flex-col gap-2.5">
                  <p className="text-sm font-bold tracking-widest uppercase opacity-40 mb-1">
                    {group.heading}
                  </p>
                  {group.items.map((item) => (
                    <button
                      type="button"
                      key={item.label}
                      className="footer-link-item text-left cursor-pointer relative inline-flex items-center text-base font-medium"
                      onMouseEnter={onLinkEnter}
                      onMouseLeave={onLinkLeave}
                      onClick={() => handleFooterLink(item)}
                    >
                      {item.label}
                      <span
                        className="link-line absolute bottom-0 left-0 right-0 h-px bg-current"
                        style={{ transform: 'scaleX(0)', transformOrigin: 'left', opacity: 0.5 }}
                      />
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <div className="footer-newsletter md:max-w-lg w-full">
              <p className="text-sm md:text-base leading-relaxed opacity-60 mb-6">
                Get exclusive early access and stay informed about product
                updates, events, and more.
              </p>

              <form
                onSubmit={handleSubmit}
                className="relative flex items-center gap-3 py-4"
                style={{
                  borderBottom: `1px solid ${emailFocused ? 'rgba(255,255,255,0.6)' : 'rgba(217,217,217,0.35)'}`,
                  transition: 'border-color 0.3s ease',
                }}
              >
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent outline-none text-milk placeholder:text-white/30 text-sm md:text-base"
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="footer-arrow-btn flex-none p-2.5 rounded-full border border-white/25 hover:bg-white/15 transition-colors duration-300"
                  onMouseEnter={onArrowEnter}
                  onMouseLeave={onArrowLeave}
                  aria-label="Submit email"
                >
                  <img src="/images/arrow.svg" alt="Submit email" className="w-5 h-5" />
                </button>
              </form>

              <p
                className={`text-[11px] mt-3 tracking-wide ${feedback.type === 'error' ? 'text-red-300' : 'text-milk/70'}`}
                aria-live="polite"
              >
                {feedback.text || 'No spam. Unsubscribe anytime.'}
              </p>
            </div>
          </div>

          <div className="copyright-box mt-16 md:px-10 px-5 pb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-35 text-milk">
              Copyright © 2026 Spylt. All Rights Reserved
            </p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                className="footer-link-item text-xs text-milk opacity-35 hover:opacity-80 transition-opacity duration-300 cursor-pointer relative"
                onMouseEnter={onLinkEnter}
                onMouseLeave={onLinkLeave}
                onClick={() => navigate('/privacy-policy')}
              >
                Privacy Policy
                <span
                  className="link-line absolute bottom-0 left-0 right-0 h-px bg-current"
                  style={{ transform: 'scaleX(0)', transformOrigin: 'left', opacity: 0.5 }}
                />
              </button>
              <button
                type="button"
                className="footer-link-item text-xs text-milk opacity-35 hover:opacity-80 transition-opacity duration-300 cursor-pointer relative"
                onMouseEnter={onLinkEnter}
                onMouseLeave={onLinkLeave}
                onClick={() => navigate('/terms-of-service')}
              >
                Terms of Service
                <span
                  className="link-line absolute bottom-0 left-0 right-0 h-px bg-current"
                  style={{ transform: 'scaleX(0)', transformOrigin: 'left', opacity: 0.5 }}
                />
              </button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default FooterSection
