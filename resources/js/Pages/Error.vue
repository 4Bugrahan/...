<script setup>
import { computed } from 'vue'
import { Head, Link } from '@inertiajs/vue3'
import { useLocale } from '@/composables/useLocale.js'

const props = defineProps({
  status: { type: Number, default: 404 },
})

const { trans } = useLocale()

const titleKeys = {
  403: 'error.title_403',
  404: 'error.title_404',
  500: 'error.title_500',
  503: 'error.title_503',
}

const descKeys = {
  403: 'error.desc_403',
  404: 'error.desc_404',
  500: 'error.desc_500',
  503: 'error.desc_503',
}

const title = computed(() => trans(titleKeys[props.status] || 'error.title_generic'))
const description = computed(() => trans(descKeys[props.status] || 'error.desc_generic'))
</script>

<template>
  <Head :title="`${status} - ${title}`" />

  <div class="min-h-screen bg-gradient-to-br from-[#0B1A35] via-[#1B3163] to-[#0B1A35] flex items-center justify-center px-6">
    <div class="text-center max-w-lg">
      <!-- Logo -->
      <Link href="/" class="inline-block mb-10">
        <img src="/images/logo-light.png" alt="4B Grup" class="h-14 mx-auto" />
      </Link>

      <!-- Status Code -->
      <div class="relative mb-6">
        <span class="text-[140px] md:text-[180px] font-black text-white/5 leading-none select-none">
          {{ status }}
        </span>
        <span class="absolute inset-0 flex items-center justify-center text-6xl md:text-7xl font-black text-[#3DAFC4]">
          {{ status }}
        </span>
      </div>

      <!-- Title -->
      <h1 class="text-2xl md:text-3xl font-bold text-white mb-4">
        {{ title }}
      </h1>

      <!-- Description -->
      <p class="text-gray-400 text-lg mb-10 leading-relaxed">
        {{ description }}
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          class="inline-flex items-center gap-2 bg-[#0E7A8C] hover:bg-[#0B6575] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#3DAFC4]/20"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
          </svg>
          {{ trans('common.home') }}
        </Link>

        <Link
          href="/iletisim"
          class="inline-flex items-center gap-2 border-2 border-white/20 hover:border-[#3DAFC4] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {{ trans('nav.contact') }}
        </Link>
      </div>
    </div>
  </div>
</template>
