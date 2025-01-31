/*
  Need fancybox.js
  
  Use data-modal-opener="1" to open #modal-1
  Use data-modal-target="" to fill input[name=target]
  Modal #modal-thanks will open automatically after form[data-formx] submitting
  
  Methods:
  openModal('1') - Opens #modal-1
  closeModal('1') - Close #modal-1
  closeModal() - Close current modal
 */

export const modal = () => {
    document.querySelectorAll('[data-modal-opener]').forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-opener')
            const targetText = this.getAttribute('data-modal-target')
    
            Fancybox.show([{
                src: `#modal-${modalId}`,
                type: "inline",
                hideClass: 'f-zoomOutDown',
                dragToClose: false,
                closeButton: false,
                keyboard: true
            }])
    
            const modal = document.getElementById(`modal-${modalId}`)
            const targetInput = modal.querySelector('input[name="target"]')
            if (targetInput) targetInput.value = targetText
        })
    })

    document.querySelectorAll('[data-modal-closer]').forEach(button => {
        button.addEventListener('click', () => {
            Fancybox.close()
        })
    })
}

export const openModal = (modalId) => {
    Fancybox.show([{
        src: `#modal-${modalId}`,
        type: "inline",
        hideClass: 'f-zoomOutDown',
        dragToClose: false,
        closeButton: false,
        keyboard: true
    }])
}

export const closeModal = (modalId = null) => {
    if (modalId) {
        const instances = Fancybox.getInstance();
        if (instances) {
            const currentSlide = instances.getSlide()
            if (currentSlide && currentSlide.src === `#modal-${modalId}`) {
                Fancybox.close()
            }
        }
    } else {
        Fancybox.close()
    }
}