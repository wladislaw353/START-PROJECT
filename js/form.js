/*
  Need modal.js

  Usage:
  form('/api/send') - all forms will submit to send.php

  form({
    default: '/api/send',    // default endpoint for all forms
    1: '/api/send_2',        // custom endpoint for data-formx="1"
    callback: '/api/send_3'  // custom endpoint for data-formx="callback"
  }, 'your_site_key')       // Optional: reCAPTCHA site key
*/

import { openModal, closeModal } from './modal.js'

export const form = async (config, siteKey = null) => {
    const endpoints = typeof config === 'string'
        ? { default: config }
        : config

    let isRecaptchaEnabled = false
    if (siteKey) {
        try {
            await loadRecaptchaScript(siteKey)
            isRecaptchaEnabled = true
            console.log('reCAPTCHA loaded successfully')
        } catch (error) {
            console.error('Failed to load reCAPTCHA:', error)
        }
    }

    document.querySelectorAll('form[data-formx]').forEach(form => {
        form.addEventListener('submit', async function(event) {
            event.preventDefault()
            const submitButton = this.querySelector('button[type="submit"]')

            this.classList.add('check_validation', 'sending_status')
            submitButton.disabled = true

            try {
                const formData = new FormData(this)

                // Handle file inputs if present
                this.querySelectorAll('input[type="file"]').forEach(fileInput => {
                    if (fileInput.files.length > 0) {
                        formData.append(fileInput.name, fileInput.files[0])
                    }
                })

                if (isRecaptchaEnabled) {
                    try {
                        const token = await grecaptcha.execute(siteKey, {action: 'submit'})
                        formData.append('recaptcha_token', token)
                    } catch (error) {
                        console.error('reCAPTCHA error:', error)
                        throw new Error('Failed to get reCAPTCHA token')
                    }
                }

                // Determine submission URL
                const formId = this.getAttribute('data-formx')
                const submissionUrl = endpoints[formId] || endpoints.default

                // Send form data
                const response = await fetch(submissionUrl, {
                    method: 'POST',
                    body: formData
                })

                const result = await response.json()
                console.log('Server response:', result)

                if (!response.ok) {
                    throw new Error(result.error || `HTTP error! status: ${response.status}`)
                }

                // On success
                const isInModal = this.closest('[data-fancybox-modal]')
                if (isInModal) {
                    closeModal()
                }

                openModal('thanks')
                this.reset()

            } catch (error) {
                console.error('Form submission error:', error)
                // Optionally show error to user
                alert('Error submitting form. Please try again.')
            } finally {
                // Reset form state
                submitButton.disabled = false
                this.classList.remove('check_validation', 'sending_status')
            }
        })
    })
}

const loadRecaptchaScript = (siteKey) => {
    // Check if script is already loaded
    if (document.querySelector(`script[src*="recaptcha/api.js"]`)) {
        return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
        script.async = true
        script.defer = true

        script.onload = () => {
            window.grecaptcha.ready(resolve)
        }
        script.onerror = reject

        document.head.appendChild(script)
    })
}