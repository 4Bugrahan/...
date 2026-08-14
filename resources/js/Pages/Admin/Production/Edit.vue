<script setup>
import { Head, useForm } from '@inertiajs/vue3'
import { reactive } from 'vue'
import AdminLayout from '@/Layouts/AdminLayout.vue'

const props = defineProps({
  values: Object,
})

const mediaSlots = ['laser', 'bend']
const imageSlots = ['card1', 'card2', 'card3', 'gallery1', 'gallery2', 'gallery3', 'gallery4', 'gallery5', 'gallery6', 'gallery7']

const formData = {}
mediaSlots.forEach(slot => {
  formData[`${slot}_image`] = null
  formData[`${slot}_video`] = null
  formData[`${slot}_remove_image`] = false
  formData[`${slot}_remove_video`] = false
})
imageSlots.forEach(slot => {
  formData[`${slot}_image`] = null
  formData[`${slot}_remove_image`] = false
})

const form = useForm(formData)

const previews = reactive({})
const current = reactive({})
;[...mediaSlots, ...imageSlots].forEach(slot => {
  previews[`${slot}_image`] = null
  current[`${slot}_image`] = props.values[`${slot}_image_url`] ?? null
  if (mediaSlots.includes(slot)) {
    previews[`${slot}_video`] = null
    current[`${slot}_video`] = props.values[`${slot}_video_url`] ?? null
  }
})

function onFileSelected(slot, type, e) {
  const file = e.target.files?.[0] || null
  form[`${slot}_${type}`] = file
  form[`${slot}_remove_${type}`] = false
  previews[`${slot}_${type}`] = file ? URL.createObjectURL(file) : null
}

function removeMedia(slot, type) {
  form[`${slot}_${type}`] = null
  form[`${slot}_remove_${type}`] = true
  previews[`${slot}_${type}`] = null
  current[`${slot}_${type}`] = null
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
      "Üretim" sayfasındaki tüm görsel/video alanlarını buradan yönetin. Şu an sayfada görünen görsel/videolar
      aşağıda "mevcut" olarak gösteriliyor — değiştirmezseniz aynı kalır, yeni bir dosya yükleyip kaydederseniz
      sadece o alan güncellenir. Video: mp4/webm/mov, en fazla 50MB. Görsel: jpg/png/webp, en fazla 5MB.
    </p>

    <form @submit.prevent="submit" class="space-y-6 max-w-3xl">
      <!-- Lazer Kesim -->
      <div class="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <h2 class="text-base font-bold text-[#1B3163]">Lazer Kesim Bölümü</h2>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Video (varsa görselden önce gösterilir)</label>
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
          <label class="block text-sm font-semibold text-gray-700 mb-2">Video (varsa görselden önce gösterilir)</label>
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

      <!-- 3'lü kart: Tasarım / İmalat / Son Ürün -->
      <div class="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <h2 class="text-base font-bold text-[#1B3163]">Tasarım / İmalat / Son Ürün Kartları</h2>
        <div class="grid sm:grid-cols-3 gap-5">
          <div v-for="(label, slot) in { card1: 'Tasarım', card2: 'İmalat', card3: 'Son Ürün' }" :key="slot">
            <label class="block text-sm font-semibold text-gray-700 mb-2">{{ label }}</label>
            <img v-if="previews[`${slot}_image`] || current[`${slot}_image`]" :src="previews[`${slot}_image`] || current[`${slot}_image`]"
              class="w-full aspect-[4/3] object-cover bg-gray-50 rounded-lg border border-gray-200 mb-2" />
            <div v-else class="w-full aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 mb-2">Görsel yok</div>
            <div class="flex items-center justify-between gap-2">
              <input type="file" accept="image/*" @change="onFileSelected(slot, 'image', $event)" class="text-xs w-full" />
              <button v-if="previews[`${slot}_image`] || current[`${slot}_image`]" type="button" @click="removeMedia(slot, 'image')"
                class="text-red-500 text-xs font-semibold hover:underline whitespace-nowrap">Kaldır</button>
            </div>
            <p v-if="form.errors[`${slot}_image`]" class="text-red-600 text-xs mt-1">{{ form.errors[`${slot}_image`] }}</p>
          </div>
        </div>
      </div>

      <!-- Kayan galeri -->
      <div class="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <h2 class="text-base font-bold text-[#1B3163]">Alttaki Kayan Galeri (7 görsel)</h2>
        <div class="grid sm:grid-cols-4 gap-5">
          <div v-for="n in 7" :key="n">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Görsel {{ n }}</label>
            <img v-if="previews[`gallery${n}_image`] || current[`gallery${n}_image`]" :src="previews[`gallery${n}_image`] || current[`gallery${n}_image`]"
              class="w-full aspect-[4/3] object-cover bg-gray-50 rounded-lg border border-gray-200 mb-2" />
            <div v-else class="w-full aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 mb-2">Görsel yok</div>
            <div class="flex items-center justify-between gap-2">
              <input type="file" accept="image/*" @change="onFileSelected(`gallery${n}`, 'image', $event)" class="text-xs w-full" />
              <button v-if="previews[`gallery${n}_image`] || current[`gallery${n}_image`]" type="button" @click="removeMedia(`gallery${n}`, 'image')"
                class="text-red-500 text-xs font-semibold hover:underline whitespace-nowrap">Kaldır</button>
            </div>
            <p v-if="form.errors[`gallery${n}_image`]" class="text-red-600 text-xs mt-1">{{ form.errors[`gallery${n}_image`] }}</p>
          </div>
        </div>
      </div>

      <button type="submit" :disabled="form.processing"
        class="bg-[#0E7A8C] hover:bg-[#0c6a7a] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50">
        {{ form.processing ? 'Kaydediliyor...' : 'Kaydet' }}
      </button>
    </form>
  </AdminLayout>
</template>
