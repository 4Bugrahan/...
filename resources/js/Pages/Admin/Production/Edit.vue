<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import AdminLayout from '@/Layouts/AdminLayout.vue'

const props = defineProps({
  values: Object,
})

const form = useForm({
  laser_image: null,
  laser_video: null,
  laser_remove_image: false,
  laser_remove_video: false,
  bend_image: null,
  bend_video: null,
  bend_remove_image: false,
  bend_remove_video: false,
})

const previews = ref({
  laser_image: null,
  laser_video: null,
  bend_image: null,
  bend_video: null,
})

const current = ref({
  laser_image: props.values.laser_image_url,
  laser_video: props.values.laser_video_url,
  bend_image: props.values.bend_image_url,
  bend_video: props.values.bend_video_url,
})

function onFileSelected(slot, type, e) {
  const file = e.target.files?.[0] || null
  form[`${slot}_${type}`] = file
  form[`${slot}_remove_${type}`] = false
  previews.value[`${slot}_${type}`] = file ? URL.createObjectURL(file) : null
}

function removeMedia(slot, type) {
  form[`${slot}_${type}`] = null
  form[`${slot}_remove_${type}`] = true
  previews.value[`${slot}_${type}`] = null
  current.value[`${slot}_${type}`] = null
}

function submit() {
  form.transform(data => ({ ...data, _method: 'post' })).post('/admin/production', { forceFormData: true })
}
</script>

<template>
  <Head><title>Üretim Sayfası | Admin</title></Head>

  <AdminLayout>
    <h1 class="text-xl font-bold text-[#1B3163] mb-1">Üretim Sayfası — Medya</h1>
    <p class="text-sm text-gray-500 mb-6">
      "Üretim" sayfasındaki lazer kesim ve büküm bölümlerinin görsel/video'sunu buradan yönetin.
      Her bölüm için ya bir görsel ya da bir video yükleyin — ikisi de yüklenirse video öncelikli gösterilir.
      Video: mp4/webm/mov, en fazla 50MB. Görsel: jpg/png/webp, en fazla 5MB.
    </p>

    <form @submit.prevent="submit" class="space-y-6 max-w-2xl">
      <!-- Lazer Kesim -->
      <div class="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <h2 class="text-base font-bold text-[#1B3163]">Lazer Kesim Bölümü</h2>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Video</label>
          <div class="flex items-center gap-4 mb-2">
            <video v-if="previews.laser_video || current.laser_video" :src="previews.laser_video || current.laser_video"
              class="w-48 h-28 object-cover bg-black rounded-lg border border-gray-200" muted autoplay loop playsinline />
            <div v-else class="w-48 h-28 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">Video yok</div>
            <button v-if="previews.laser_video || current.laser_video" type="button" @click="removeMedia('laser', 'video')"
              class="text-red-500 text-xs font-semibold hover:underline">Videoyu Kaldır</button>
          </div>
          <input type="file" accept="video/mp4,video/webm,video/quicktime" @change="onFileSelected('laser', 'video', $event)" class="text-sm" />
          <p v-if="form.errors.laser_video" class="text-red-600 text-xs mt-1">{{ form.errors.laser_video }}</p>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Görsel (video yoksa gösterilir)</label>
          <div class="flex items-center gap-4 mb-2">
            <img v-if="previews.laser_image || current.laser_image" :src="previews.laser_image || current.laser_image"
              class="w-48 h-28 object-cover bg-gray-50 rounded-lg border border-gray-200" />
            <div v-else class="w-48 h-28 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">Görsel yok</div>
            <button v-if="previews.laser_image || current.laser_image" type="button" @click="removeMedia('laser', 'image')"
              class="text-red-500 text-xs font-semibold hover:underline">Görseli Kaldır</button>
          </div>
          <input type="file" accept="image/*" @change="onFileSelected('laser', 'image', $event)" class="text-sm" />
          <p v-if="form.errors.laser_image" class="text-red-600 text-xs mt-1">{{ form.errors.laser_image }}</p>
        </div>
      </div>

      <!-- Büküm -->
      <div class="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <h2 class="text-base font-bold text-[#1B3163]">Büküm Bölümü</h2>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Video</label>
          <div class="flex items-center gap-4 mb-2">
            <video v-if="previews.bend_video || current.bend_video" :src="previews.bend_video || current.bend_video"
              class="w-48 h-28 object-cover bg-black rounded-lg border border-gray-200" muted autoplay loop playsinline />
            <div v-else class="w-48 h-28 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">Video yok</div>
            <button v-if="previews.bend_video || current.bend_video" type="button" @click="removeMedia('bend', 'video')"
              class="text-red-500 text-xs font-semibold hover:underline">Videoyu Kaldır</button>
          </div>
          <input type="file" accept="video/mp4,video/webm,video/quicktime" @change="onFileSelected('bend', 'video', $event)" class="text-sm" />
          <p v-if="form.errors.bend_video" class="text-red-600 text-xs mt-1">{{ form.errors.bend_video }}</p>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Görsel (video yoksa gösterilir)</label>
          <div class="flex items-center gap-4 mb-2">
            <img v-if="previews.bend_image || current.bend_image" :src="previews.bend_image || current.bend_image"
              class="w-48 h-28 object-cover bg-gray-50 rounded-lg border border-gray-200" />
            <div v-else class="w-48 h-28 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">Görsel yok</div>
            <button v-if="previews.bend_image || current.bend_image" type="button" @click="removeMedia('bend', 'image')"
              class="text-red-500 text-xs font-semibold hover:underline">Görseli Kaldır</button>
          </div>
          <input type="file" accept="image/*" @change="onFileSelected('bend', 'image', $event)" class="text-sm" />
          <p v-if="form.errors.bend_image" class="text-red-600 text-xs mt-1">{{ form.errors.bend_image }}</p>
        </div>
      </div>

      <button type="submit" :disabled="form.processing"
        class="bg-[#0E7A8C] hover:bg-[#0c6a7a] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50">
        {{ form.processing ? 'Kaydediliyor...' : 'Kaydet' }}
      </button>
    </form>
  </AdminLayout>
</template>
