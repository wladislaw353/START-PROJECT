/*
  Add data-cursor-move="5" width speed value
*/

export const cursor_move_anim = () => {
  const elements = document.querySelectorAll('[data-cursor-move]')
  if (!elements.length) return
  
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    
    const x = (clientX - windowWidth / 2) / (windowWidth / 2)
    const y = (clientY - windowHeight / 2) / (windowHeight / 2)
    
    elements.forEach(element => {
      const movement = parseInt(element.dataset.cursorMove) || 10
      
      const rect = element.getBoundingClientRect()
      const isVisible = 
        rect.bottom > 0 && 
        rect.top < windowHeight &&
        rect.right > 0 &&
        rect.left < windowWidth
      
      if (isVisible) {
        element.style.transform = `translate(${x * movement}px, ${y * movement}px)`
      }
    })
  })
}