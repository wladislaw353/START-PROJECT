export const phone_mask = () => {
    const getUserLocale = () => {
        const country = navigator.language.split('-')[1] || navigator.language.toUpperCase()
        const masks = {
            'UA': '+38(999)999-99-99',
            'CS': '+420(999)999-999',
            'SK': '+421(999)999-999',
            'MD': '+373(999)999-99',
            'RO': '+40(999)999-999',
            'RU': '+38(999)999-99-99',
            'PL': '+48(999)999-999',
            'IT': '+39(999)999-9999',
            'HU': '+36(999)999-999',
            'US': '+1(999)999-9999',
            'CA': '+1(999)999-9999',
            'default': ''
        }
        return masks[country] || masks.default
    }
    const phoneMask = getUserLocale()
    Inputmask({
        mask: phoneMask,
        showMaskOnHover: false,
        showMaskOnFocus: true
    }).mask(document.querySelectorAll('.phone-mask'))
}