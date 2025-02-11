/*
  Need swiper.js
  Use .fullscreen on .swiper in html and set paddingElement here as reference for left padding
  Use .mobileOnly on .swiper in html to run init just on phone (<=550px)
  Use data-slides="4" in html with count
  Use data-speed="1000" in html to set speed
  Use data-fade in html for fade effect
  Use data-gap-off in html for set gap 0
  Use data-loop in html for infinity swipe
  Use data-parallax in html for turn on parallax (https://swiperjs.com/swiper-api#parallax)
  Use data-pagination="false" in html to turn off .swiper-pagination (.swiper + .swiper-pagination)
 */

export const sliders = () => {
  const swipers = document.querySelectorAll('.swiper')
  let mobileOnlySwiperInstances = []

  swipers.forEach(swiperElement => {
    const gap = swiperElement.dataset.gapOff !== undefined ? 0 : null
    const speed = swiperElement.dataset.speed || 350
    const slidesPerView = swiperElement.dataset.slides || 1
    const showPagination = swiperElement.dataset.pagination !== 'false'
    const isMobileOnly = swiperElement.classList.contains('mobileOnly')

    const initializeSwiper = () => {
      const swiperOptions = {
        slidesPerView: 1,
        spaceBetween: gap ?? 24,
        speed: speed,
        freeMode: false,
        draggable: true,
        direction: 'horizontal',
        pagination: showPagination
            ? {
              el: swiperElement.nextElementSibling,
              clickable: true
            }
            : false,
        autoplay: {
          delay: 3000
        },
        breakpoints: {
          ...(isMobileOnly
              ? {
                550: {
                  slidesPerView: 0,
                  spaceBetween: 0,
                  enabled: false
                }
              }
              : {
                600: {
                  slidesPerView: Math.min(2, slidesPerView),
                  spaceBetween: gap ?? 24
                },
                950: {
                  slidesPerView: Math.min(3, slidesPerView),
                  spaceBetween: gap ?? 32
                },
                1200: {
                  slidesPerView: parseFloat(slidesPerView),
                  spaceBetween: gap ?? 32
                }
              })
        }
      }

      if (swiperElement.dataset.fade !== undefined) {
        swiperOptions.effect = 'fade'
        swiperOptions.fadeEffect = { crossFade: true }
      }

      if (swiperElement.dataset.parallax !== undefined) {
        swiperOptions.parallax = true
      }

      if (swiperElement.dataset.loop !== undefined) {
        swiperOptions.loop = true
      }

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

    if (isMobileOnly) {
      const handleMobileSwiper = () => {
        if (window.innerWidth <= 550) {
          if (!mobileOnlySwiperInstances.find(s => s.el === swiperElement)) {
            const swiperInstance = initializeSwiper()
            mobileOnlySwiperInstances.push(swiperInstance)
          }
        } else {
          const index = mobileOnlySwiperInstances.findIndex(s => s.el === swiperElement)
          if (index !== -1) {
            mobileOnlySwiperInstances[index].destroy(true, true)
            mobileOnlySwiperInstances.splice(index, 1)
          }
        }
      }

      handleMobileSwiper()
      window.addEventListener('resize', handleMobileSwiper)
    } else {
      initializeSwiper()
    }
  })

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
