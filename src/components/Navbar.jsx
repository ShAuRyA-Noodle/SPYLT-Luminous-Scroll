import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToSection } from '../utils/scroll'

gsap.registerPlugin(ScrollTrigger)

const NAV_ITEMS = [
  { label: 'Flavours', sectionId: 'flavours' },
  { label: 'Nutrition', sectionId: 'nutrition' },
  { label: 'Benefits', sectionId: 'benefits' },
  { label: 'Reviews', sectionId: 'testimonials' },
]

const Navbar = () => {
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const ctaFillRef = useRef(null)

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -90,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      delay: 0.45,
    })

    const scrolledTrigger = ScrollTrigger.create({
      start: 'top -60',
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    })

    return () => {
      scrolledTrigger.kill()
    }
  }, { scope: navRef })

  useEffect(() => {
    gsap.to(navRef.current, {
      paddingTop: scrolled ? '0.5rem' : '2.25rem',
      paddingBottom: scrolled ? '0.5rem' : '2.25rem',
      duration: 0.5,
      ease: 'power3.out',
    })
  }, [scrolled])

  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return

    gsap.killTweensOf(menu)

    if (menuOpen) {
      gsap.fromTo(
        menu,
        { y: -20, opacity: 0, pointerEvents: 'none' },
        { y: 0, opacity: 1, pointerEvents: 'all', duration: 0.45, ease: 'expo.out' },
      )
      gsap.from('.mobile-menu-item', {
        y: 16,
        opacity: 0,
        stagger: 0.06,
        ease: 'expo.out',
        duration: 0.5,
        delay: 0.05,
      })
      return
    }

    gsap.to(menu, {
      y: -12,
      opacity: 0,
      pointerEvents: 'none',
      duration: 0.3,
      ease: 'power2.in',
    })
  }, [menuOpen])

  const onLogoMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.28
    const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.28
    gsap.to(event.currentTarget, { x: dx, y: dy, duration: 0.35, ease: 'power2.out' })
  }

  const onLogoLeave = (event) => {
    gsap.to(event.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  const onCtaMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.2
    const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.2
    gsap.to(event.currentTarget, { x: dx, y: dy, duration: 0.35, ease: 'power2.out' })
  }

  const onCtaLeave = (event) => {
    gsap.to(event.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  const onLinkEnter = (event) => {
    const line = event.currentTarget.querySelector('.nav-line')
    if (!line) return
    gsap.to(line, { scaleX: 1, duration: 0.3, ease: 'power2.out', transformOrigin: 'left' })
  }

  const onLinkLeave = (event) => {
    const line = event.currentTarget.querySelector('.nav-line')
    if (!line) return
    gsap.to(line, { scaleX: 0, duration: 0.25, ease: 'power2.in', transformOrigin: 'right' })
  }

  const handleNavigate = (sectionId) => {
    scrollToSection(sectionId)
    setMenuOpen(false)
  }

  const handleCtaEnter = () => {
    if (!ctaFillRef.current) return
    gsap.to(ctaFillRef.current, { scaleX: 1, duration: 0.4, ease: 'power3.inOut', transformOrigin: 'left' })
  }

  const handleCtaLeave = () => {
    if (!ctaFillRef.current) return
    gsap.to(ctaFillRef.current, { scaleX: 0, duration: 0.35, ease: 'power3.inOut', transformOrigin: 'right' })
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[9999] px-5 md:px-9 pt-9 pb-4"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="relative flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="relative z-10"
            aria-label="Go to top of page"
          >
            <img
              src="/images/nav-logo.svg"
              alt="Spylt"
              className="w-20 md:w-24 select-none"
              onMouseMove={onLogoMove}
              onMouseLeave={onLogoLeave}
            />
          </button>

          <ul className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  className="relative text-[11px] font-bold tracking-[0.22em] uppercase text-dark-brown/70 hover:text-dark-brown transition-colors duration-300 pb-0.5"
                  onMouseEnter={onLinkEnter}
                  onMouseLeave={onLinkLeave}
                  onClick={() => handleNavigate(item.sectionId)}
                >
                  {item.label}
                  <span
                    className="nav-line absolute -bottom-0.5 left-0 right-0 h-px bg-dark-brown"
                    style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="hidden lg:flex relative overflow-hidden items-center gap-2 bg-dark-brown text-milk text-[10px] font-bold tracking-[0.2em] uppercase px-7 py-3 rounded-full"
            onMouseMove={onCtaMove}
            onMouseLeave={(event) => {
              onCtaLeave(event)
              handleCtaLeave()
            }}
            onMouseEnter={handleCtaEnter}
            onFocus={handleCtaEnter}
            onBlur={handleCtaLeave}
            onClick={() => handleNavigate('order')}
          >
            <span
              ref={ctaFillRef}
              className="absolute inset-0 bg-mid-brown rounded-full"
              style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
            />
            <span className="relative z-10">Order Now</span>
            <svg
              className="relative z-10 w-3 h-3"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            className="lg:hidden relative z-10 flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className="block h-[1.5px] w-[22px] bg-dark-brown transition-all duration-300 ease-out"
                style={{
                  transform: menuOpen
                    ? index === 0
                      ? 'rotate(45deg) translateY(6.5px)'
                      : index === 1
                        ? 'scaleX(0)'
                        : 'rotate(-45deg) translateY(-6.5px)'
                    : 'none',
                }}
              />
            ))}
          </button>
        </div>

        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(250,234,222,0.75)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
            boxShadow: scrolled ? '0 4px 30px rgba(82,49,34,0.08), inset 0 0 0 0.5px rgba(82,49,34,0.1)' : 'none',
            opacity: scrolled ? 1 : 0,
          }}
        />
      </nav>

      <div
        ref={menuRef}
        className="mobile-menu fixed top-0 left-0 right-0 z-[9998] pt-24 pb-10 px-6 lg:hidden pointer-events-none"
        style={{
          opacity: 0,
          background: 'rgba(250,234,222,0.95)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '0.5px solid rgba(82,49,34,0.1)',
        }}
      >
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="mobile-menu-item">
              <button
                type="button"
                className="w-full text-left block py-4 text-3xl font-bold uppercase tracking-tight text-dark-brown border-b border-dark-brown/10"
                onClick={() => handleNavigate(item.sectionId)}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="mt-6 mobile-menu-item">
            <button
              type="button"
              className="inline-block bg-dark-brown text-milk text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-full"
              onClick={() => handleNavigate('order')}
            >
              Order Now
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
