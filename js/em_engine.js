/*
  Set CONFIG.desktop.defaultFont the same to $base-font-size (_functions.scss)
 */

export const em_engine = () => {
  const CONFIG = {
    desktop: { defaultFont: 16, defaultWidth: 1200, minWidth: 1024, used: !0 },
    tablet: { defaultFont: 16, defaultWidth: 767, minWidth: 640, used: !0 },
    mobile: { defaultFont: 20, defaultWidth: 500, minWidth: 320, used: !0 }
  }

  function size() {
    const a = Math.max(CONFIG[device].minWidth, windowW) / CONFIG[device].defaultWidth,
      b = CONFIG[device].used && windowW < CONFIG.desktop.defaultWidth ? a : 1
    return CONFIG[device].defaultFont * b
  }

  let windowW = '',
    windowH = '',
    device = ''

  function reloadWindowSize() {
    ;(windowW = window.innerWidth),
      (windowH = window.innerHeight),
      (device =
        windowW < CONFIG.mobile.defaultWidth ? 'mobile' : windowW < CONFIG.tablet.defaultWidth ? 'tablet' : 'desktop'),
      document.documentElement.style.setProperty('font-size', `${size()}px`),
      document.documentElement.style.setProperty('--vh', `${windowH}px`)
  }

  reloadWindowSize()
  window.addEventListener('resize', reloadWindowSize)
}
