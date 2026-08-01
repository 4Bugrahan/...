import { usePage, router } from '@inertiajs/vue3'
import { computed } from 'vue'

export function useLocale() {
    const page = usePage()

    const locale = computed(() => page.props.locale || 'tr')
    const translations = computed(() => page.props.t || {})

    function trans(key) {
        return translations.value[key] || key
    }

    function field(obj, fieldName) {
        if (!obj) return ''
        if (locale.value !== 'tr') {
            const translated = obj.translations?.[fieldName]?.[locale.value]
            if (translated && String(translated).trim() !== '') return translated
        }
        return obj[fieldName] || ''
    }

    function switchLocale(newLocale) {
        router.post('/set-locale', { locale: newLocale }, {
            preserveState: false,
            preserveScroll: false,
        })
    }

    return { locale, trans, field, switchLocale }
}
