/*
  You can use with animate.css
  <div data-animate="fadeIn, 1.2"></div>
  Arguments:
    class - string, required
    delay - float, optional

  Add data-animate-mobile-off to off animation on Mobile

  Animate class in config below. Default: animated
 */

export const scroll_anim = () => {
    const config = {
        threshold: 0.1,
        animateClass: 'animated'
    };

    const animatedElements = new Set()

    const parseConfig = value => {
        if (!value) return [null, 0]
        const parts = value.split(',').map(part => part.trim())
        return [
            parts[0] || null,
            parts.length > 1 ? parseFloat(parts[1]) * 1000 || 0 : 0
        ]
    }

    const handleIntersection = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedElements.has(entry.target)) {
                const [animClass, delay] = parseConfig(entry.target.dataset.animate)

                const applyAnimation = () => {
                    entry.target.classList.add(config.animateClass)

                    if (animClass) {
                        entry.target.classList.add(animClass)
                    }
                }

                if (delay > 0) {
                    setTimeout(applyAnimation, delay)
                } else {
                    applyAnimation()
                }

                animatedElements.add(entry.target)
                observer.unobserve(entry.target)
            }
        })
    }

    const observer = new IntersectionObserver(handleIntersection, {
        threshold: config.threshold
    })

    document.querySelectorAll('[data-animate]:not([data-animate-mobile-off])')
        .forEach(element => !animatedElements.has(element) && observer.observe(element))
}