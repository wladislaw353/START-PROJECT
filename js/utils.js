/*
  Use #sr_fb for Facebook in html
  Use #sr_in for LinkedIn in html
  Use #sr_x for X in html

  Use is_IOS in main.js to detect iOS devises
  Use get_utm in main.js to get utm from current page
  Use removeDiacritics with text as argument
 */

export const social_share = () => {
  function setupShareLink(elementId, urlTemplate) {
    const element = document.getElementById(elementId)
    if (element) {
      element.href = urlTemplate
      element.addEventListener('click', function (event) {
        event.preventDefault()
        window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
      })
    }
  }
  const currentURL = window.location.href
  const title = document.title
  setupShareLink('sr_fb', `https://www.facebook.com/sharer/sharer.php?u=${currentURL}`)
  setupShareLink('sr_in', `https://www.linkedin.com/shareArticle?mini=true&url=${currentURL}&title=${title}`)
  setupShareLink('sr_x', `https://x.com/intent/post?url=${currentURL}&text=${title}`)
}

export const helpers = () => {
  // IFRAME
  document.querySelectorAll('iframe, video').forEach(el => {
    const width = parseInt(el.getAttribute('width'))
    const height = parseInt(el.getAttribute('height'))
    el.style.aspectRatio = (width / height).toString()
  })

  // REMOVE EMPTY LINKS
  document.querySelectorAll('[href="#"]').forEach(el => {
    el.removeAttribute('href')
  })

  // TEXTAREA AUTO-HEIGHT
  const textareaFields = document.querySelectorAll('textarea')
  if (!textareaFields.length) return
  const adjustHeight = (textarea) => {
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight+5}px`
  }
  textareaFields.forEach(textarea => {
    adjustHeight(textarea)
    textarea.addEventListener('input', () => adjustHeight(textarea))
    textarea.addEventListener('focus', () => adjustHeight(textarea))
    new MutationObserver(() => adjustHeight(textarea)).observe(textarea, {
      childList: true, characterData: true, subtree: true
    })
  })
}

// <main> min-height
function setMainMinHeight() {
  const main = document.querySelector('main');
  if (!main) return;
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const headerHeight = header ? header.offsetHeight : 0;
  const footerHeight = footer ? footer.offsetHeight : 0;
  main.style.minHeight = `${window.innerHeight - headerHeight - footerHeight}px`;
}
setMainMinHeight()
window.addEventListener('resize', setMainMinHeight);

export const fixed_header = (scroll) => {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const header = document.querySelector('header')
    if (scroll < 60) scroll = 60
    if (scrollTop > scroll) {
      header.classList.add('fixed-header')
    }
    if (scrollTop < scroll - 50) {
      header.classList.remove('fixed-header')
    }
  })
}

export const is_iOS = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(userAgent)
}

export const get_utm = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || ''
  }
}


export const removeDiacritics = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
