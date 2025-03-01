/*
  Number animation with scroll trigger
  Usage examples:
    <span data-number-anim>865</span> - animate from 0 to 865
    <span data-number-anim="50">865</span> - animate from 50 to 865
    <span data-number-anim="50, 25">865</span> - animate from 50 to 865 with speed 25
 */

export const number_anim = () => {
    const config = {
        defaultMin: 0,
        defaultSpeed: 20,
        selector: '[data-number-anim]'
    };

    const animatedElements = new Set();

    const parseConfig = (element) => {
        const max = parseInt(element.textContent) || 0;

        const attrValue = element.dataset.numberAnim;
        if (!attrValue || attrValue === '') {
            return [config.defaultMin, max, config.defaultSpeed];
        }

        const parts = attrValue.split(',').map(part => part.trim());
        const min = parseInt(parts[0]) || config.defaultMin;
        const speed = parts.length > 1 ? parseInt(parts[1]) || config.defaultSpeed : config.defaultSpeed;

        return [min, max, speed];
    };

    const formatNumber = num => num.toLocaleString();

    const startAnimation = element => {
        const [min, max, speed] = parseConfig(element);
        let current = min;
        const increment = Math.max(1, Math.ceil((max - min) / (1000 / speed)));

        element.textContent = formatNumber(current);

        const animate = () => {
            if (current < max) {
                current = Math.min(current + increment, max);
                element.textContent = formatNumber(current);
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    const handleIntersection = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedElements.has(entry.target)) {
                startAnimation(entry.target);
                animatedElements.add(entry.target);
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, {threshold: 0.1});

    document.querySelectorAll(config.selector)
        .forEach(element => !animatedElements.has(element) && observer.observe(element));
};