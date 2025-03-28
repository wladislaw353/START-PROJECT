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
  document.querySelectorAll('iframe').forEach(iframe => {
    const iWidth = iframe.getAttribute('width')
    const iHeight = iframe.getAttribute('height')
    iframe.style.aspectRatio = iWidth / iHeight
  })

  // REMOVE EMPTY LINKS
  document.querySelectorAll('[href="#"]').forEach(element => {
    element.removeAttribute('href')
  })

  // TEXTAREA AUTO-HEIGHT
  const textareas = document.querySelectorAll('textarea')
  if (!textareas.length) return
  const adjustHeight = (textarea) => {
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight+5}px`
  }
  textareas.forEach(textarea => {
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
  const get_params = window.location.search
    .replace('?', '')
    .split('&')
    .reduce(function (b, c) {
      const d = c.split('=')
      return (b[decodeURIComponent(d[0])] = decodeURIComponent(d[1])), b
    }, {})
  const utm = {
    utm_source: get_params['utm_source'] ? get_params['utm_source'] : '',
    utm_medium: get_params['utm_medium'] ? get_params['utm_medium'] : '',
    utm_campaign: get_params['utm_campaign'] ? get_params['utm_campaign'] : '',
    utm_content: get_params['utm_content'] ? get_params['utm_content'] : '',
    utm_term: get_params['utm_term'] ? get_params['utm_term'] : ''
  }
}

export const removeDiacritics = text => {
  const diacritics = {
    á: 'a',
    à: 'a',
    â: 'a',
    ã: 'a',
    ä: 'a',
    å: 'a',
    ą: 'a',
    ā: 'a',
    č: 'c',
    ç: 'c',
    ć: 'c',
    ď: 'd',
    đ: 'd',
    é: 'e',
    è: 'e',
    ê: 'e',
    ë: 'e',
    ě: 'e',
    ę: 'e',
    ē: 'e',
    í: 'i',
    ì: 'i',
    î: 'i',
    ï: 'i',
    ī: 'i',
    ł: 'l',
    ñ: 'n',
    ń: 'n',
    ň: 'n',
    ó: 'o',
    ò: 'o',
    ô: 'o',
    õ: 'o',
    ö: 'o',
    ø: 'o',
    ō: 'o',
    ř: 'r',
    ŕ: 'r',
    š: 's',
    ś: 's',
    ş: 's',
    ß: 'ss',
    ť: 't',
    ú: 'u',
    ù: 'u',
    û: 'u',
    ü: 'u',
    ů: 'u',
    ū: 'u',
    ý: 'y',
    ÿ: 'y',
    ž: 'z',
    ź: 'z',
    ż: 'z',
    Á: 'A',
    À: 'A',
    Â: 'A',
    Ã: 'A',
    Ä: 'A',
    Å: 'A',
    Ą: 'A',
    Ā: 'A',
    Č: 'C',
    Ç: 'C',
    Ć: 'C',
    Ď: 'D',
    Đ: 'D',
    É: 'E',
    È: 'E',
    Ê: 'E',
    Ë: 'E',
    Ě: 'E',
    Ę: 'E',
    Ē: 'E',
    Í: 'I',
    Ì: 'I',
    Î: 'I',
    Ï: 'I',
    Ī: 'I',
    Ł: 'L',
    Ñ: 'N',
    Ń: 'N',
    Ň: 'N',
    Ó: 'O',
    Ò: 'O',
    Ô: 'O',
    Õ: 'O',
    Ö: 'O',
    Ø: 'O',
    Ō: 'O',
    Ř: 'R',
    Ŕ: 'R',
    Š: 'S',
    Ś: 'S',
    Ş: 'S',
    Ť: 'T',
    Ú: 'U',
    Ù: 'U',
    Û: 'U',
    Ü: 'U',
    Ů: 'U',
    Ū: 'U',
    Ý: 'Y',
    Ÿ: 'Y',
    Ž: 'Z',
    Ź: 'Z',
    Ż: 'Z'
  }
  return text.replace(
    /[áàâãäåąāčçćďđéèêëěęēíìîïīłñńňóòôõöøōřŕšśşßťúùûüůūýÿžźżÁÀÂÃÄÅĄĀČÇĆĎĐÉÈÊËĚĘĒÍÌÎÏĪŁÑŃŇÓÒÔÕÖØŌŘŔŠŚŞŤÚÙÛÜŮŪÝŸŽŹŻ]/g,
    function (match) {
      return diacritics[match]
    }
  )
}
