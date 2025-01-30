/*
    slideUp / slideDown / slideToggle - functions from jQuery
    Attributes - element, duration (default: 300)
 */

export const slideToggle = (element, duration = 300) => {
  if (window.getComputedStyle(element).display === 'none') {
    return slideDown(element, duration)
  } else {
    return slideUp(element, duration)
  }
}

export const slideUp = (element, duration = 300) => {
  const slideHeight = element.clientHeight
  element.style.overflow = 'hidden'

  let startTime = null

  function slideUpAnimation(currentTime) {
    if (!startTime) {
      startTime = currentTime
    }
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)
    element.style.height = `${slideHeight * (1 - progress)}px`
    if (progress < 1) {
      requestAnimationFrame(slideUpAnimation)
    } else {
      element.style.display = 'none'
      element.style.height = ''
    }
  }

  requestAnimationFrame(slideUpAnimation)
}

export const slideDown = (element, duration = 300) => {
  if (element.clientHeight === 0) {
    element.style.display = 'block'
    element.style.overflow = 'hidden'
    const slideHeight = element.clientHeight

    let startTime = null

    function slideDownAnimation(currentTime) {
      if (!startTime) {
        startTime = currentTime
      }
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      element.style.height = `${slideHeight * progress}px`
      if (progress < 1) {
        requestAnimationFrame(slideDownAnimation)
        setTimeout(() => {
          element.style.overflow = 'auto'
        }, 300)
      } else {
        element.style.height = ''
      }
    }

    requestAnimationFrame(slideDownAnimation)
  }
}
