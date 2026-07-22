import { ref } from 'vue'

/**
 * Anthropic API ile otomatik çeviri composable'ı.
 * Admin formlarında kullanılır.
 */
export function useTranslation() {
    const translating = ref({})       // { fieldKey: true/false }
    const translateError = ref(null)

    /**
     * Tek bir alanı çevir.
     *
     * @param {Object} form       — Inertia useForm nesnesi
     * @param {string} trKey      — Türkçe alan adı (ör: 'name', 'description')
     * @param {string} enKey      — İngilizce alan adı (ör: 'name_en', 'description__en')
     */
    async function translateField(form, trKey, enKey) {
        const text = form[trKey]
        if (!text || !text.trim()) {
            translateError.value = 'Çevrilecek Türkçe metin boş.'
            return
        }

        translating.value[trKey] = true
        translateError.value = null

        try {
            const response = await window.axios.post('/admin/translate', { text })
            form[enKey] = response.data.translated_text
        } catch (err) {
            translateError.value = err.response?.data?.error || 'Çeviri başarısız oldu.'
        } finally {
            translating.value[trKey] = false
        }
    }

    /**
     * Formdaki tüm boş EN alanlarını toplu çevir.
     *
     * @param {Object} form       — Inertia useForm nesnesi
     * @param {Array}  fieldPairs — [{ tr: 'name', en: 'name_en' }, ...]
     */
    async function translateAll(form, fieldPairs) {
        // Sadece EN alanı boş olanları topla
        const toTranslate = {}
        for (const pair of fieldPairs) {
            const trText = form[pair.tr]
            const enText = form[pair.en]
            if (trText && trText.trim() && (!enText || !enText.trim())) {
                toTranslate[pair.tr] = trText
            }
        }

        if (Object.keys(toTranslate).length === 0) {
            translateError.value = 'Çevrilecek boş İngilizce alan bulunamadı.'
            return
        }

        // Hepsini loading yap
        for (const key of Object.keys(toTranslate)) {
            translating.value[key] = true
        }
        translateError.value = null

        try {
            const response = await window.axios.post('/admin/translate-batch', {
                texts: toTranslate,
            })

            const translations = response.data.translations
            for (const pair of fieldPairs) {
                if (translations[pair.tr]) {
                    form[pair.en] = translations[pair.tr]
                }
            }
        } catch (err) {
            translateError.value = err.response?.data?.error || 'Toplu çeviri başarısız oldu.'
        } finally {
            for (const key of Object.keys(toTranslate)) {
                translating.value[key] = false
            }
        }
    }

    /**
     * Belirli bir alan çeviri yapılıyor mu?
     */
    function isTranslating(key) {
        return !!translating.value[key]
    }

    /**
     * Herhangi bir çeviri devam ediyor mu?
     */
    function isAnyTranslating() {
        return Object.values(translating.value).some(Boolean)
    }

    return {
        translating,
        translateError,
        translateField,
        translateAll,
        isTranslating,
        isAnyTranslating,
    }
}
