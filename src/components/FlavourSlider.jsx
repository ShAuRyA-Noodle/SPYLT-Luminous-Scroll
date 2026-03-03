import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'
import { flavorlists } from '../constants'

const FlavourSlider = () => {
  const sliderRef = useRef(null)
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })

  useGSAP(() => {
    const slider = sliderRef.current
    if (!slider) return

    const flavors = slider.querySelector('.flavors')
    if (!flavors) return

    const scrollAmount = Math.max(0, flavors.scrollWidth - window.innerWidth)

    if (!isTablet && scrollAmount > 0) {
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.flavor-section',
          start: 'top top',
          end: `+=${scrollAmount + 550}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      })

      pinTl.to(flavors, {
        x: -(scrollAmount + 160),
        ease: 'none',
      })
    }

  }, {
    scope: sliderRef,
    dependencies: [isTablet],
    revertOnUpdate: true,
  })

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {flavorlists.map((flavor) => (
          <div
            key={flavor.name}
            className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}
          >
            <img
              src={`/images/${flavor.color}-bg.svg`}
              alt={`${flavor.name} background`}
              className="absolute bottom-0"
            />
            <img
              src={`/images/${flavor.color}-drink.webp`}
              alt={`${flavor.name} bottle`}
              className="drinks"
            />
            <img
              src={`/images/${flavor.color}-elements.webp`}
              alt={`${flavor.name} design elements`}
              className="elements"
            />
            <h1>{flavor.name}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FlavourSlider
