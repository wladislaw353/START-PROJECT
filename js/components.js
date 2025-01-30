/*
    Use .multiple for .accordion to close every item manually
    Add #totop to button
 */

import { slideDown, slideUp } from './smooth_func.js'

export const to_top = () => {
  const totopBtn = document.getElementById('totop')

  const toggleTotopButton = () => {
    totopBtn.classList.toggle('active', window.scrollY > 700)
  }

  window.addEventListener('scroll', toggleTotopButton)

  totopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    history.replaceState(null, null, ' ')
  })
}

export const tabs = () => {
  document.querySelectorAll('.tab-container .tab-nav [data-tab]').forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault()
      const parent = tab.closest('.tab-container')
      const tabs = Array.from(parent.querySelectorAll('.tab-nav [data-tab]'))
      tabs.forEach(tab => tab.classList.remove('active'))
      tab.classList.add('active')
      const items = Array.from(parent.querySelectorAll('.tab-content > .item'))
      items.forEach(item => {
        item.style.display = 'none'
        item.classList.remove('active')
      })
      const itemIndex = tabs.indexOf(tab)
      items[itemIndex].style.display = 'block'
      items[itemIndex].classList.add('active')
      window.location.hash = tab.dataset.tab
    })
  })
  const hash = window.location.hash.slice(1)
  const tabHash = document.querySelector(`.tab-container .tab-nav [data-tab="${hash}"]`)
  if (tabHash) tabHash.click()
}

export const accordion = () => {
  document.querySelectorAll('.accordion').forEach(accordion => {
    accordion.addEventListener('click', e => {
      if (e.target.closest('.header') && !e.target.closest('[drop-list-toggle]')) {
        const item = e.target.closest('.item')
        if (item.classList.contains('active')) {
          item.classList.remove('active')
          slideUp(item.querySelector('.content'))
        } else {
          if (!accordion.classList.contains('multiple')) {
            accordion.querySelectorAll('.item').forEach(item2 => {
              if (item2 !== item) {
                item2.classList.remove('active')
                slideUp(item2.querySelector('.content'))
              }
            })
          }
          item.classList.add('active')
          slideDown(item.querySelector('.content'))
        }
      }
    })
  })
}
