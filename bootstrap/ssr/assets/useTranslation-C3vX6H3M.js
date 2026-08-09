import { ref } from "vue";
const TARGET_LOCALES = ["en", "fr", "de", "nl"];
function useTranslation() {
  const translating = ref(false);
  const translateError = ref(null);
  async function translateAll(form, fields) {
    const toTranslate = {};
    for (const field of fields) {
      const text = form[field];
      if (text && String(text).trim()) {
        toTranslate[field] = text;
      }
    }
    if (Object.keys(toTranslate).length === 0) {
      translateError.value = "Çevrilecek Türkçe metin bulunamadı.";
      return;
    }
    translating.value = true;
    translateError.value = null;
    try {
      const response = await window.axios.post("/admin/translate-batch", {
        fields: toTranslate
      });
      const { translations = {}, failed = [] } = response.data;
      for (const locale of TARGET_LOCALES) {
        if (!form.translations[locale]) form.translations[locale] = {};
        const localeResult = translations[locale] || {};
        for (const field of Object.keys(toTranslate)) {
          if (localeResult[field]) {
            form.translations[locale][field] = localeResult[field];
          }
        }
      }
      if (failed.length > 0) {
        translateError.value = `Şu diller çevrilemedi, tekrar dener misin: ${failed.join(", ").toUpperCase()}`;
      }
    } catch (err) {
      translateError.value = err.response?.data?.message || "Çeviri başarısız oldu.";
    } finally {
      translating.value = false;
    }
  }
  return {
    translating,
    translateError,
    translateAll
  };
}
export {
  useTranslation as u
};
