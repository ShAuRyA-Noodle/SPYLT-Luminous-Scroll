import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'

import Navbar from '../components/Navbar'
import HeroSection from '../sections/HeroSection'
import MessageSection from '../sections/MessageSection'
import FlavourSection from '../sections/FlavourSection'
import NutritionSection from '../sections/NutritionSection'
import BenefitSection from '../sections/BenefitSection'
import TestimonialSection from '../sections/TestimonialSection'
import FooterSection from '../sections/FooterSection'
import { scrollToSection } from '../utils/scroll'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const HomePage = () => {
  const wrapperRef = useRef(null)

  useGSAP(() => {
    let smoother = ScrollSmoother.get()
    if (!smoother) {
      smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.35,
        smoothTouch: 0.1,
        effects: true,
        normalizeScroll: true,
      })
    }

    const hash = window.location.hash.replace('#', '')
    if (hash) {
      requestAnimationFrame(() => {
        scrollToSection(hash, { updateHash: false })
      })
    } else {
      ScrollTrigger.clearScrollMemory()
      window.scrollTo(0, 0)
    }

    return () => {
      if (smoother) smoother.kill()
    }
  }, { scope: wrapperRef })

  return (
    <main>
      <Navbar />
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content">
          <HeroSection id="home" />
          <MessageSection id="about" />
          <FlavourSection id="flavours" />
          <NutritionSection id="nutrition" />
          <BenefitSection id="benefits" />
          <TestimonialSection id="testimonials" />
          <FooterSection id="order" />
        </div>
      </div>
    </main>
  )
}

export default HomePage
