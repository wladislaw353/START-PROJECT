/*
  Need number_anim.js
  Use <span data-number-anim="50, 25"></span>
  Arguments:
    max - integer, required
    speed - integer, optional
 */

export const number_anim = () => {
    const config = {
        startValue: 1,
        defaultMax: 100,
        defaultSpeed: 20,
        selector: '[data-number-anim]'
    };

    const animatedElements = new Set()

    const parseConfig = value => {
        if (!value) return [config.defaultMax];
        const parts = value.split(',').map(part => part.trim())
        return [
            parseInt(parts[0]) || config.defaultMax,
            parts.length > 1 ? parseInt(parts[1]) || config.defaultSpeed : config.defaultSpeed
        ];
    };

    const formatNumber = num => num.toLocaleString()

    const startAnimation = element => {
        const [max, speed] = parseConfig(element.dataset.numberAnim)
        let current = config.startValue
        const increment = Math.max(1, Math.ceil(max / (1000 / speed)))

        element.textContent = formatNumber(current)

        const animate = () => {
            if (current < max) {
                current = Math.min(current + increment, max)
                element.textContent = formatNumber(current)
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }

    const handleIntersection = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedElements.has(entry.target)) {
                startAnimation(entry.target)
                animatedElements.add(entry.target)
                observer.unobserve(entry.target)
            }
        })
    }

    const observer = new IntersectionObserver(handleIntersection, {theshold: 0.1})

    document.querySelectorAll(config.selector)
        .forEach(element => !animatedElements.has(element) && observer.observe(element))
}