<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import { useTranslation } from '@/composables/useTranslation.js'

const props = defineProps({
  project: Object,
})

const isEdit = !!props.project

const form = useForm({
  title: props.project?.title || '',
  description: props.project?.description || '',
  location: props.project?.location || '',
  is_active: props.project?.is_active ?? true,
  images: [],
  existing_images: props.project?.images || [],
  translations: {
    en: { title: props.project?.translations?.title?.en || '', description: props.project?.translations?.description?.en || '', location: props.project?.translations?.location?.en || '' },
    fr: { title: props.project?.translations?.title?.fr || '', description: props.project?.translations?.description?.fr || '', location: props.project?.translations?.location?.fr || '' },
    de: { title: props.project?.translations?.title?.de || '', description: props.project?.translations?.description?.de || '', location: props.project?.translations?.location?.de || '' },
    nl: { title: props.project?.translations?.title?.nl || '', description: props.project?.translations?.description?.nl || '', location: props.project?.translations?.location?.nl || '' },
  },
})

const { translating, translateError, translateAll } = useTranslation()
const previews = ref([])

function onFilesSelected(e) {
  const files = Array.from(e.target.files || [])
  form.images = files
  previews.value = files.map(f => URL.createObjectURL(f))
}

function removeExisting(path) {
  form.existing_images = form.existing_images.filter(p => p !== path)
}

function submit() {
  const url = isEdit ? `/admin/projects/${props.project.id}` : '/admin/projects'
  form.transform(data => (isEdit ? { ...data, _method: 'put' } : data))
    .post(url, { forceFormData: true })
}
</script>

<template>
  <Head><title>{{ isEdit ? 'Proje Düzenle' : 'Yeni Proje' }} | Admin</title></Head>

  <AdminLayout>
    <h1 class="text-xl font-bold text-[#1B3163] mb-6">{{ isEdit ? 'Proje Düzenle' : 'Yeni Proje' }}</h1>

    <form @submit.prevent="submit" class="bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-3xl">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Proje Başlığı (TR)</label>
        <input v-model="form.title" type="text" required
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]" />
        <p v-if="form.errors.title" class="text-red-600 text-xs mt-1">{{ form.errors.title }}</p>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Konum (TR)</label>
        <input v-model="form.location" type="text" placeholder="Örn. Sivas"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Açıklama (TR)</label>
        <textarea v-model="form.description" rows="4"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"></textarea>
      </div>

      <div>
        <button type="button" @click="translateAll(form, ['title', 'description', 'location'])" :disabled="translating"
          class="text-xs font-bold text-[#0E7A8C] border border-[#0E7A8C] rounded-lg px-3 py-1.5 hover:bg-[#0E7A8C]/5 disabled:opacity-50">
          {{ translating ? 'Çevriliyor...' : 'EN / FR / DE / NL Otomatik Çevir (DeepL)' }}
        </button>
        <p v-if="translateError" class="text-red-600 text-xs mt-1">{{ translateError }}</p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div v-for="locale in ['en', 'fr', 'de', 'nl']" :key="locale" class="border border-gray-100 rounded-lg p-3">
          <div class="text-xs font-bold text-gray-400 uppercase mb-2">{{ locale }}</div>
          <input v-model="form.translations[locale].title" type="text" placeholder="Proje başlığı"
            class="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm mb-2" />
          <input v-model="form.translations[locale].location" type="text" placeholder="Konum"
            class="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm mb-2" />
          <textarea v-model="form.translations[locale].description" rows="2" placeholder="Açıklama"
            class="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm"></textarea>
        </div>
      </div>

      <div class="flex items-center gap-6">
        <label class="flex items-center gap-2 text-sm text-gray-600">
          <input v-model="form.is_active" type="checkbox" class="rounded border-gray-300" /> Aktif
        </label>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Görseller (birden fazla seçebilirsiniz)</label>
        <div class="flex flex-wrap gap-3 mb-3">
          <div v-for="(path, i) in form.existing_images" :key="path" class="relative">
            <img :src="project?.image_urls?.[i] || path" class="w-20 h-20 object-cover rounded-lg" />
            <button type="button" @click="removeExisting(path)"
              class="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs leading-none">×</button>
          </div>
          <div v-for="(src, i) in previews" :key="i">
            <img :src="src" class="w-20 h-20 object-cover rounded-lg border-2 border-[#3DAFC4]" />
          </div>
        </div>
        <input type="file" multiple accept="image/*" @change="onFilesSelected"
          class="text-sm" />
      </div>

      <button type="submit" :disabled="form.processing"
        class="bg-[#0E7A8C] hover:bg-[#0c6a7a] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50">
        {{ form.processing ? 'Kaydediliyor...' : 'Kaydet' }}
      </button>
    </form>
  </AdminLayout>
</template>
