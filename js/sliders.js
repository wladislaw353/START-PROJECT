/*
  Need swiper.js

  Classes:
  - .fullscreen - with left padding matching .holder
  - .mobileOnly - enabled only on mobile (<= 550px)

  Basic usage:
  - data-slides="4" - number of slides (default: 1)
  - data-gap="20" - gap between slides (default: 0)
  - data-speed="1000" - animation speed (default: 350)
  - data-effect="fade|coverflow|flip|cube|cards" - slider effect

  Advanced usage:
  - data-slides="[1200=3.5][950=2][600=1.5][320=1]" - breakpoints for slides
  - data-gap="[1200=40][950=30][600=20][320=10]" - breakpoints for gaps
  - data-autoplay="3000" - autoplay with delay in ms
  - data-autoplay-disable-on-interaction="false" - continue autoplay after user interaction

  Additional options:
  - data-loop - infinite sliding
  - data-parallax - parallax effect
  - data-free-mode - free mode sliding
  - data-centered-slides - center active slide
 */

export const sliders = () => {
  const swipers = document.querySelectorAll('.swiper')

  // Parse breakpoints from string format "[1200=3.5][950=2]"
  const parseBreakpoints = (input) => {
    if (!input || typeof input !== 'string') return null

    if (input.includes('[') && input.includes('=')) {
      const breakpoints = {}
      const regex = /\[(\d+)=([^[\]]+)\]/g
      let match

      while ((match = regex.exec(input)) !== null) {
        const breakpoint = parseInt(match[1], 10)
        const value = match[2].includes('.') ? parseFloat(match[2]) : parseInt(match[2], 10)
        breakpoints[breakpoint] = value
      }

      return Object.keys(breakpoints).length > 0 ? breakpoints : null
    }

    return input.includes('.') ? parseFloat(input) : parseInt(input, 10)
  }

  swipers.forEach(swiperElement => {
    const isMobileOnly = swiperElement.classList.contains('mobileOnly')

    const initializeSwiper = () => {
      // Read basic parameters
      const slidesInput = swiperElement.dataset.slides || '1'
      const gapInput = swiperElement.dataset.gap || '0'
      const speed = parseInt(swiperElement.dataset.speed || '350', 10)
      const effect = swiperElement.dataset.effect || 'slide'

      // Parse breakpoints
      const slidesBreakpoints = parseBreakpoints(slidesInput)
      const gapBreakpoints = parseBreakpoints(gapInput)

      // Base values
      const defaultSlidesPerView = typeof slidesBreakpoints === 'object' ? 1 : slidesBreakpoints || 1
      const defaultGap = typeof gapBreakpoints === 'object' ? 0 : gapBreakpoints || 0

      // Create breakpoints object
      const breakpointsObj = {}

      // Collect slide breakpoints
      if (typeof slidesBreakpoints === 'object') {
        Object.keys(slidesBreakpoints).forEach(breakpoint => {
          if (!breakpointsObj[breakpoint]) breakpointsObj[breakpoint] = {}
          breakpointsObj[breakpoint].slidesPerView = slidesBreakpoints[breakpoint]
        })
      }

      // Collect gap breakpoints
      if (typeof gapBreakpoints === 'object') {
        Object.keys(gapBreakpoints).forEach(breakpoint => {
          if (!breakpointsObj[breakpoint]) breakpointsObj[breakpoint] = {}
          breakpointsObj[breakpoint].spaceBetween = gapBreakpoints[breakpoint]
        })
      }

      // Add special breakpoint for mobile devices
      if (isMobileOnly) {
        breakpointsObj[550] = {
          slidesPerView: 0,
          spaceBetween: 0,
          enabled: false
        }
      }

      // Base slider settings
      const swiperOptions = {
        slidesPerView: defaultSlidesPerView,
        spaceBetween: defaultGap,
        speed: speed,
        direction: 'horizontal'
      }

      // Add breakpoints if they exist
      if (Object.keys(breakpointsObj).length > 0) {
        swiperOptions.breakpoints = breakpointsObj
      }

      // Find pagination element
      const paginationElement = swiperElement.querySelector('.swiper-pagination') ||
      swiperElement.nextElementSibling?.classList.contains('swiper-pagination') ?
          swiperElement.nextElementSibling : null

      if (paginationElement) {
        swiperOptions.pagination = {
          el: paginationElement,
          clickable: true
        }
      }

      // Handle autoplay
      if (swiperElement.hasAttribute('data-autoplay')) {
        const autoplayDelay = parseInt(swiperElement.dataset.autoplay, 10) || 3000;
        const disableOnInteraction = swiperElement.dataset.autoplayDisableOnInteraction !== 'false';

        swiperOptions.autoplay = {
          delay: autoplayDelay,
          disableOnInteraction: disableOnInteraction
        };
      }

      // Add effect if specified
      if (effect !== 'slide') {
        swiperOptions.effect = effect

        // Settings for each effect
        const effectSettings = {
          fade: { fadeEffect: { crossFade: true } },
          coverflow: {
            coverflowEffect: {
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            }
          },
          flip: {
            flipEffect: {
              slideShadows: true,
              limitRotation: true
            }
          },
          cube: {
            cubeEffect: {
              slideShadows: true,
              shadow: true,
              shadowOffset: 20,
              shadowScale: 0.94
            }
          },
          cards: {
            cardsEffect: {
              slideShadows: true
            }
          }
        }

        // Add settings for selected effect
        if (effectSettings[effect]) {
          Object.assign(swiperOptions, effectSettings[effect])
        }
      }

      // Boolean options
      const booleanOptions = {
        loop: 'loop',
        freeMode: 'freeMode',
        centeredSlides: 'centeredSlides'
      }

      // Add boolean options
      Object.entries(booleanOptions).forEach(([dataAttr, swiperOpt]) => {
        if (swiperElement.hasAttribute(`data-${dataAttr}`)) {
          swiperOptions[swiperOpt] = true
        }
      })

      // Parallax configuration
      if (swiperElement.hasAttribute('data-parallax')) {
        // Enable the parallax effect
        swiperOptions.parallax = true;

        // Упрощаем логику для parallax - без жестко заданных классов
        const slides = swiperElement.querySelectorAll('.swiper-slide');
        slides.forEach(slide => {
          // Ищем элементы с атрибутом data-parallax
          const parallaxElements = slide.querySelectorAll('[data-parallax]');
          parallaxElements.forEach(el => {
            // Если у элемента нет атрибута data-swiper-parallax, добавляем его
            if (!el.hasAttribute('data-swiper-parallax')) {
              const value = el.getAttribute('data-parallax') || '-100';
              el.setAttribute('data-swiper-parallax', value);
            }
          });
        });
      }

      // Find navigation buttons
      const nextArrow = swiperElement.parentElement.querySelector('.swiper-button-next')
      const prevArrow = swiperElement.parentElement.querySelector('.swiper-button-prev')
      if (nextArrow && prevArrow) {
        swiperOptions.navigation = {
          nextEl: nextArrow,
          prevEl: prevArrow
        }
      }

      return new Swiper(swiperElement, swiperOptions)
    }

    // Handle mobile sliders
    if (isMobileOnly) {
      let swiperInstance = null;

      const handleMobileSwiper = () => {
        if (window.innerWidth <= 550) {
          if (!swiperInstance) {
            swiperInstance = initializeSwiper();
          }
        } else {
          if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
          }
        }
      }

      handleMobileSwiper();
      window.addEventListener('resize', handleMobileSwiper);
    } else {
      initializeSwiper();
    }
  })

  // Handle fullscreen sliders
  const fullscreenSwipers = document.querySelectorAll('.swiper.fullscreen')
  if (fullscreenSwipers.length) {
    const updateSliderPadding = () => {
      const paddingElement = document.querySelector('.holder')
      if (!paddingElement) return

      const leftPadding = paddingElement.getBoundingClientRect().left
      fullscreenSwipers.forEach(swiper => {
        swiper.style.paddingLeft = `${leftPadding}px`
      })
    }

    updateSliderPadding()

    let resizeTimeout
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateSliderPadding, 150)
    })
  }
}