import { em_engine } from './em_engine.js'
import { sliders } from './sliders.js'
import { social_share, helpers, is_iOS, get_utm, removeDiacritics, $ } from './utils.js'
import { slideDown, slideUp, slideToggle } from './smooth_func.js'
import { tabs, accordion, to_top } from './components.js'
import { sticky_nav } from './sticky_nav.js'
import { modals } from './modals.js'

em_engine()

document.addEventListener('DOMContentLoaded', () => {

  helpers()
  
  modals()

  // PRELOADER
  if (document.querySelector('.preloader')) {
    setTimeout(() => {
      document.querySelector('.preloader').classList.add('active')
      new WOW().init()
    }, 100)
  } else new WOW().init()

  // SLIDER
  sliders()

  // ACCORDION
  accordion()

  // TO TOP BUTTON
  to_top()

  // BURGER
  document.querySelector('header .burger').addEventListener('click', () => {
    const nav = document.querySelector('header nav')
    const header = document.querySelector('header')
    const burger = document.querySelector('header .burger')
    slideToggle(nav)
    header.classList.toggle('active')
    burger.classList.toggle('active')
  })

  // FIXED HEADER
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const header = document.querySelector('header')
    if (scrollTop > 100) {
      header.classList.add('fixed-header');
    } else {
      header.classList.remove('fixed-header')
    }
  })

  // GALLARY
  Fancybox.bind('[data-fancybox="gallery"]', {
    infinite: false,
    hideClass: 'f-zoomOutDown',
    Thumbs: {
      autoStart: true,
    }
  })

  // MODALS
  Fancybox.bind('[data-fancybox]:not([data-fancybox="gallery"])', {
    dragToClose: false,
    closeButton: true,
    keyboard: true,
    template: {
      closeButton: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill="#888" d="M1.17209 24.0002C0.940287 24.0002 0.713675 23.9315 0.520921 23.8027C0.328167 23.674 0.177931 23.4909 0.0892164 23.2768C0.000501992 23.0626 -0.0227054 22.827 0.0225297 22.5996C0.0677649 22.3722 0.17941 22.1634 0.343344 21.9995L21.9996 0.34328C22.2194 0.123481 22.5175 0 22.8283 0C23.1392 0 23.4373 0.123481 23.6571 0.34328C23.8769 0.563078 24.0004 0.861188 24.0004 1.17203C24.0004 1.48287 23.8769 1.78098 23.6571 2.00078L2.00084 23.657C1.89211 23.766 1.76292 23.8524 1.6207 23.9113C1.47848 23.9702 1.32602 24.0004 1.17209 24.0002Z"/><path fill="#888" d="M22.8283 24.0002C22.6743 24.0004 22.5219 23.9702 22.3797 23.9113C22.2375 23.8524 22.1083 23.766 21.9995 23.657L0.34328 2.00078C0.123481 1.78098 0 1.48287 0 1.17203C0 0.861188 0.123481 0.563078 0.34328 0.34328C0.563078 0.123481 0.861188 0 1.17203 0C1.48287 0 1.78098 0.123481 2.00078 0.34328L23.657 21.9995C23.821 22.1634 23.9326 22.3722 23.9778 22.5996C24.0231 22.827 23.9999 23.0626 23.9112 23.2768C23.8224 23.4909 23.6722 23.674 23.4795 23.8027C23.2867 23.9315 23.0601 24.0002 22.8283 24.0002V24.0002Z"/></svg>'
    }
  })
  
  // Input Mask
  const getUserLocale = () => {
    const country = navigator.language.split('-')[1] || navigator.language.toUpperCase()
    const masks = {
      'UA': '+38(999)999-99-99',
      'CZ': '+420(999)999-999',
      'SK': '+421(999)999-999',
      'MD': '+373(999)999-99',
      'RO': '+40(999)999-999',
      'PL': '+48(999)999-999',
      'IT': '+39(999)999-9999',
      'HU': '+36(999)999-999',
      'US': '+1(999)999-9999',
      'CA': '+1(999)999-9999',
      'default': ''
    }
    return masks[country] || masks.default
  }
  const phoneMask = getUserLocale()
  Inputmask({
    mask: phoneMask,
    showMaskOnHover: false,
    showMaskOnFocus: true
  }).mask(document.querySelectorAll('.phone-mask'))

})