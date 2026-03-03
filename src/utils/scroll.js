import { ScrollSmoother } from 'gsap/ScrollSmoother'

export const scrollToSection = (sectionId, options = {}) => {
  if (!sectionId) return false

  const {
    updateHash = true,
  } = options

  const target = document.getElementById(sectionId)
  if (!target) return false

  const smoother = ScrollSmoother.get()

  if (smoother) {
    smoother.scrollTo(target, true)
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (updateHash) {
    window.history.replaceState({}, '', `#${sectionId}`)
  }

  return true
}

export const openExternal = (href) => {
  if (!href) return

  if (href.startsWith('mailto:')) {
    window.location.href = href
    return
  }

  window.open(href, '_blank', 'noopener,noreferrer')
}
