import { em_engine } from './em_engine.js'
import { sliders } from './sliders.js'
import { social_share, helpers, is_iOS, get_utm, removeDiacritics, $ } from './utils.js'
import { slideDown, slideUp, slideToggle } from './smooth_func.js'
import { tabs, accordion, to_top } from './components.js'
import { sticky_nav } from './sticky_nav.js'
import { modal, openModal, closeModal } from './modal.js'
import { form } from './form.js'
import { number_anim } from './number_anim.js'
import { scroll_anim } from './scroll_anim.js'
import { phone_mask } from './phone_mask.js'

em_engine()

document.addEventListener('DOMContentLoaded', () => {

  helpers()

  modal()

  form('send.php')
  
  number_anim()

  sliders()

  accordion()

  to_top()
  
  phone_mask()

  // PRELOADER
  if (document.querySelector('.preloader')) {
    setTimeout(() => {
      document.querySelector('.preloader').classList.add('active')
      scroll_anim()
    }, 100)
  } else scroll_anim()

  // GALLERY
  Fancybox.bind('[data-fancybox="gallery"]', {
    infinite: false,
    hideClass: 'f-zoomOutDown',
    Thumbs: {
      autoStart: true,
    }
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

  // BURGER
  document.querySelector('header .burger').addEventListener('click', () => {
    const nav = document.querySelector('header nav')
    const header = document.querySelector('header')
    const burger = document.querySelector('header .burger')
    slideToggle(nav)
    header.classList.toggle('active')
    burger.classList.toggle('active')
  })
})