<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import AdminLayout from '@/Layouts/AdminLayout.vue'

const props = defineProps({
  values: Object,
})

const form = useForm({
  about_profile_title: props.values.about_profile_title || '',
  about_profile_text1: props.values.about_profile_text1 || '',
  about_profile_text2: props.values.about_profile_text2 || '',
  about_profile_text3: props.values.about_profile_text3 || '',
  about_profile_btn: props.values.about_profile_btn || '',
  image: null,
  remove_image: false,
})

const preview = ref(null)
const currentImageUrl = ref(props.values.about_profile_image_url)

function onFileSelected(e) {
  const file = e.target.files?.[0] || null
  form.image = file
  form.remove_image = false
  preview.value = file ? URL.createObjectURL(file) : null
}

function removeImage() {
  form.image = null
  form.remove_image = true
  preview.value = null
  currentImageUrl.value = null
}

function submit() {
  form.transform(data => ({ ...data, _method: 'post' })).post('/admin/about', { forceFormData: true })
}
</script>

<template>
  <Head><title>Hakkımızda | Admin</title></Head>

  <AdminLayout>
    <h1 class="text-xl font-bold text-[#1B3163] mb-1">Hakkımızda — Kurumsal Profil</h1>
    <p class="text-sm text-gray-500 mb-6">
      Bu içerik "Kurumsal" sayfasının profil bölümünde (görsel + metin) görünür. Türkçe metin girilir; diğer diller şu an bu metnin
      önceden yapılan çevirilerini kullanmaya devam eder — bunları değiştirmez, sadece Türkçe kaynağı günceller.
    </p>

    <form @submit.prevent="submit" class="bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-2xl">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Görsel</label>
        <div class="flex items-center gap-4 mb-3">
          <img v-if="preview" :src="preview" class="w-40 h-28 object-cover bg-gray-50 rounded-lg border-2 border-[#3DAFC4]" />
          <img v-else-if="currentImageUrl" :src="currentImageUrl" class="w-40 h-28 object-cover bg-gray-50 rounded-lg border border-gray-200" />
          <div v-else class="w-40 h-28 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">Görsel yok</div>
          <button v-if="preview || currentImageUrl" type="button" @click="removeImage" class="text-red-500 text-xs font-semibold hover:underline">
            Görseli Kaldır
          </button>
        </div>
        <input type="file" accept="image/*" @change="onFileSelected" class="text-sm" />
        <p v-if="form.errors.image" class="text-red-600 text-xs mt-1">{{ form.errors.image }}</p>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Başlık</label>
        <input v-model="form.about_profile_title" type="text"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Paragraf 1</label>
        <textarea v-model="form.about_profile_text1" rows="3"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"></textarea>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Paragraf 2</label>
        <textarea v-model="form.about_profile_text2" rows="3"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"></textarea>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Paragraf 3</label>
        <textarea v-model="form.about_profile_text3" rows="3"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"></textarea>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Buton Metni</label>
        <input v-model="form.about_profile_btn" type="text" placeholder="Proje Teklifi Alın"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]" />
      </div>

      <button type="submit" :disabled="form.processing"
        class="bg-[#0E7A8C] hover:bg-[#0c6a7a] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50">
        {{ form.processing ? 'Kaydediliyor...' : 'Kaydet' }}
      </button>
    </form>
  </AdminLayout>
</template>
