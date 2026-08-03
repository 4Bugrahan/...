<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import AdminLayout from '@/Layouts/AdminLayout.vue'

const props = defineProps({
  partner: Object,
})

const isEdit = !!props.partner

const form = useForm({
  name: props.partner?.name || '',
  website: props.partner?.website || '',
  order: props.partner?.order || 0,
  is_active: props.partner?.is_active ?? true,
  logo: null,
  existing_logo: props.partner?.logo || '',
})

const preview = ref(null)

function onFileSelected(e) {
  const file = e.target.files?.[0] || null
  form.logo = file
  preview.value = file ? URL.createObjectURL(file) : null
}

function submit() {
  const url = isEdit ? `/admin/partners/${props.partner.id}` : '/admin/partners'
  form.transform(data => (isEdit ? { ...data, _method: 'put' } : data))
    .post(url, { forceFormData: true })
}
</script>

<template>
  <Head><title>{{ isEdit ? 'Marka Düzenle' : 'Yeni Marka' }} | Admin</title></Head>

  <AdminLayout>
    <h1 class="text-xl font-bold text-[#1B3163] mb-6">{{ isEdit ? 'Marka Düzenle' : 'Yeni Marka' }}</h1>

    <form @submit.prevent="submit" class="bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-lg">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Marka Adı</label>
        <input v-model="form.name" type="text" required
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]" />
        <p v-if="form.errors.name" class="text-red-600 text-xs mt-1">{{ form.errors.name }}</p>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Website (opsiyonel)</label>
        <input v-model="form.website" type="text" placeholder="https://..."
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]" />
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
        <label class="block text-sm font-semibold text-gray-700 mb-2">Logo</label>
        <div class="flex items-center gap-3 mb-3">
          <img v-if="preview" :src="preview" class="w-24 h-16 object-contain bg-gray-50 rounded-lg border-2 border-[#3DAFC4]" />
          <img v-else-if="partner?.logo_url" :src="partner.logo_url" class="w-24 h-16 object-contain bg-gray-50 rounded-lg border border-gray-200" />
          <div v-else class="w-24 h-16 bg-gray-100 rounded-lg"></div>
        </div>
        <input type="file" accept="image/*,.svg" @change="onFileSelected" class="text-sm" />
      </div>

      <button type="submit" :disabled="form.processing"
        class="bg-[#0E7A8C] hover:bg-[#0c6a7a] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50">
        {{ form.processing ? 'Kaydediliyor...' : 'Kaydet' }}
      </button>
    </form>
  </AdminLayout>
</template>
