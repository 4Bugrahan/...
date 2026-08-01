<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import { useTranslation } from '@/composables/useTranslation.js'

const props = defineProps({
  parentCategories: Array,
  category: Object,
})

const isEdit = !!props.category

const form = useForm({
  name: props.category?.name || '',
  description: props.category?.description || '',
  parent_id: props.category?.parent_id || '',
  is_active: props.category?.is_active ?? true,
  order: props.category?.order || 0,
  image: null,
  translations: {
    en: { name: props.category?.translations?.name?.en || '', description: props.category?.translations?.description?.en || '' },
    fr: { name: props.category?.translations?.name?.fr || '', description: props.category?.translations?.description?.fr || '' },
    de: { name: props.category?.translations?.name?.de || '', description: props.category?.translations?.description?.de || '' },
    nl: { name: props.category?.translations?.name?.nl || '', description: props.category?.translations?.description?.nl || '' },
  },
})

const { translating, translateError, translateAll } = useTranslation()
const preview = ref(null)

function onFileSelected(e) {
  const file = e.target.files?.[0]
  form.image = file || null
  preview.value = file ? URL.createObjectURL(file) : null
}

function submit() {
  const url = isEdit ? `/admin/categories/${props.category.id}` : '/admin/categories'
  form.transform(data => (isEdit ? { ...data, _method: 'put' } : data))
    .post(url, { forceFormData: true })
}
</script>

<template>
  <Head><title>{{ isEdit ? 'Kategori Düzenle' : 'Yeni Kategori' }} | Admin</title></Head>

  <AdminLayout>
    <h1 class="text-xl font-bold text-[#1B3163] mb-6">{{ isEdit ? 'Kategori Düzenle' : 'Yeni Kategori' }}</h1>

    <form @submit.prevent="submit" class="bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-3xl">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Kategori Adı (TR)</label>
        <input v-model="form.name" type="text" required
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]" />
        <p v-if="form.errors.name" class="text-red-600 text-xs mt-1">{{ form.errors.name }}</p>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Açıklama (TR)</label>
        <textarea v-model="form.description" rows="3"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"></textarea>
      </div>

      <div>
        <button type="button" @click="translateAll(form, ['name', 'description'])" :disabled="translating"
          class="text-xs font-bold text-[#0E7A8C] border border-[#0E7A8C] rounded-lg px-3 py-1.5 hover:bg-[#0E7A8C]/5 disabled:opacity-50">
          {{ translating ? 'Çevriliyor...' : 'EN / FR / DE / NL Otomatik Çevir (DeepL)' }}
        </button>
        <p v-if="translateError" class="text-red-600 text-xs mt-1">{{ translateError }}</p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div v-for="locale in ['en', 'fr', 'de', 'nl']" :key="locale" class="border border-gray-100 rounded-lg p-3">
          <div class="text-xs font-bold text-gray-400 uppercase mb-2">{{ locale }}</div>
          <input v-model="form.translations[locale].name" type="text" placeholder="Kategori adı"
            class="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm mb-2" />
          <textarea v-model="form.translations[locale].description" rows="2" placeholder="Açıklama"
            class="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm"></textarea>
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Üst Kategori</label>
        <select v-model="form.parent_id" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
          <option value="">Yok (Ana Kategori)</option>
          <option v-for="cat in parentCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
      </div>

      <div class="flex items-center gap-6">
        <label class="flex items-center gap-2 text-sm text-gray-600">
          <input v-model="form.is_active" type="checkbox" class="rounded border-gray-300" /> Aktif
        </label>
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-600">Sıra</label>
          <input v-model.number="form.order" type="number" class="w-20 border border-gray-200 rounded-lg px-2 py-1 text-sm" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Görsel</label>
        <div class="flex gap-3 mb-3">
          <img v-if="preview" :src="preview" class="w-20 h-20 object-cover rounded-lg border-2 border-[#3DAFC4]" />
          <img v-else-if="category?.image_url" :src="category.image_url" class="w-20 h-20 object-cover rounded-lg" />
        </div>
        <input type="file" accept="image/*" @change="onFileSelected" class="text-sm" />
      </div>

      <button type="submit" :disabled="form.processing"
        class="bg-[#0E7A8C] hover:bg-[#0c6a7a] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50">
        {{ form.processing ? 'Kaydediliyor...' : 'Kaydet' }}
      </button>
    </form>
  </AdminLayout>
</template>
