/*
    Smooth anchor links
    Adding .active to anchor links during scroll
    Triggered sections - .js-nav-trigger[id], h2[id], h3[id], h4[id]
    Links container - .sticky-nav
 */

export const sticky_nav = () => {
  // STICKY NAV SCROLL
  const sections = document.querySelectorAll('.js-nav-trigger[id], h2[id], h3[id], h4[id]')
  const navLinksContainer = document.querySelector('.sticky-nav')

  const getCurrentSection = () => {
    const centerPosition = window.scrollY + window.innerHeight / 2
    return Array.from(sections)
        .filter(section => section.offsetTop <= centerPosition)
        .pop()
  }

  const updateActiveLink = () => {
    const currentSection = getCurrentSection()
    if (!currentSection) return

    const currentId = currentSection.getAttribute('id')
    navLinksContainer.querySelectorAll('a[href^="#"]').forEach(link => link.classList.remove('active'))
    document.querySelector(`.sticky-nav a[href="#${currentId}"]`)?.classList.add('active')
  }

  let ticking = false
  document.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveLink()
        ticking = false
      })
      ticking = true
    }
  })

  updateActiveLink()

  // STICKY NAV CLICK
  const stickyNav = document.querySelector('.sticky-nav')
  if (stickyNav) {
    stickyNav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        event.preventDefault()
        const targetId = event.target.getAttribute('href')
        const targetElement = document.querySelector(targetId)

        const header = this.closest('header')
        const burger = header?.querySelector('.burger')
        if (header && burger?.classList.contains('active')) {
          burger.click()
        }

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    })
  }
}
