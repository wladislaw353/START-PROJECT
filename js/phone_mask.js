export const phone_mask = async () => {
    const cached = localStorage.getItem('userCountry')
    if (cached) {
        return applyMask(cached)
    }

    try {
        const response = await fetch('https://ipinfo.io/json')
        const data = await response.json()

        localStorage.setItem('userCountry', data.country)
        localStorage.setItem('countryTimestamp', Date.now())

        return applyMask(data.country)
    } catch (error) {
        console.error('Error getting location:', error)
        return applyMask('default')
    }
}

const PHONE_MASKS = {
    'UA': '+38(999)999-99-99',
    'CZ': '+420(999)999-999',
    'SK': '+421(999)999-999',
    'MD': '+373(999)999-99',
    'RO': '+40(999)999-999',
    'RU': '+7(999)999-99-99',
    'PL': '+48(999)999-999',
    'IT': '+39(999)999-9999',
    'HU': '+36(999)999-999',
    'US': '+1(999)999-9999',
    'CA': '+1(999)999-9999',
    'default': ''
}

const applyMask = (country) => {
    const mask = PHONE_MASKS[country] || PHONE_MASKS.default

    Inputmask({
        mask,
        showMaskOnHover: false,
        showMaskOnFocus: true
    }).mask(document.querySelectorAll('.phone-mask'))
}

const clearOldCache = () => {
    const timestamp = localStorage.getItem('countryTimestamp')
    if (!timestamp) return

    const DAY = 24 * 60 * 60 * 1000
    if (Date.now() - parseInt(timestamp) > DAY) {
        localStorage.removeItem('userCountry')
        localStorage.removeItem('countryTimestamp')
    }
}

clearOldCache()