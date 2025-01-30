/*
  Need swiper.js
  Use .fullscreen on .swiper in html and set paddingElement here as reference for left padding
  Use .mobileOnly on .swiper in html to run init just on phone
  Use data-slides-per-view="4" in html with count
  Use data-pagination="false" in html to turn off .swiper-pagination (.swiper + .swiper-pagination)
 */

export const sliders = () => {
  const swipers = document.querySelectorAll('.swiper')
  let mobileOnlySwiperInstances = []

  swipers.forEach(swiperElement => {
    const slidesPerView = swiperElement.dataset.slidesPerView || 3
    const showPagination = swiperElement.dataset.pagination !== 'false'
    const isMobileOnly = swiperElement.classList.contains('mobileOnly')

    const initializeSwiper = () => {
      return new Swiper(swiperElement, {
        slidesPerView: 1,
        spaceBetween: 24,
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
          delay: 5000
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
                  spaceBetween: 24
                },
                950: {
                  slidesPerView: Math.min(3, slidesPerView),
                  spaceBetween: 32
                },
                1200: {
                  slidesPerView: parseFloat(slidesPerView),
                  spaceBetween: 32
                }
              })
        }
      })
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
      const paddingElement = document.querySelector('.title')
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
