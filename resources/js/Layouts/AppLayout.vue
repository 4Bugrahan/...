<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Head, Link, usePage } from '@inertiajs/vue3'
import { useLocale } from '@/composables/useLocale.js'

const mobileOpen = ref(false)
const kurumOpen  = ref(false)
const urunOpen   = ref(false)
const mobileUrunOpen = ref(false)

const { locale, trans, switchLocale } = useLocale()
const page       = usePage()
const categories = computed(() => page.props.navCategories || [])
const seo        = computed(() => page.props.seo || {})
const ss         = computed(() => page.props.siteSettings || {})

// İletişim bilgileri — panelden dinamik
const phone1      = computed(() => ss.value.phone1      || '+90 346 225 00 00')
const phone2      = computed(() => ss.value.phone2      || '+90 535 660 00 60')
const email       = computed(() => ss.value.email       || 'info@4bgrup.com')
const whatsapp    = computed(() => ss.value.whatsapp    || '905356600060')
const address     = computed(() => ss.value.address     || 'Sivas, Türkiye')
const footerText  = computed(() => ss.value.footer_text || '')
const facebook    = computed(() => ss.value.facebook    || '')
const instagram   = computed(() => ss.value.instagram   || '')
const linkedin    = computed(() => ss.value.linkedin    || '')

const phone1Tel    = computed(() => 'tel:' + phone1.value.replace(/\s/g, ''))
const phone2Tel    = computed(() => 'tel:' + phone2.value.replace(/\s/g, ''))
const emailHref    = computed(() => 'mailto:' + email.value)
const whatsappUrl  = computed(() => 'https://wa.me/' + whatsapp.value.replace(/\D/g, ''))

// Back to Top
const showBackToTop = ref(false)
function handleScroll() {
  showBackToTop.value = window.scrollY > 400
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <Head>
    <title>{{ seo.title || '4B Grup Endüstriyel Ticaret' }}</title>
    <meta v-if="seo.desc"     name="description"        :content="seo.desc">
    <meta v-if="seo.keywords" name="keywords"           :content="seo.keywords">
    <meta v-if="seo.title"    property="og:title"       :content="seo.title">
    <meta v-if="seo.desc"     property="og:description" :content="seo.desc">
    <meta v-if="seo.og_image" property="og:image"       :content="seo.og_image">
  </Head>

  <div class="min-h-screen flex flex-col">

    <!-- TOP BAR -->
    <div class="bg-[#1B3163] text-white text-xs py-2.5 hidden md:block">
      <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div class="flex items-center gap-4 text-white/55">
          <a :href="phone1Tel" class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-[#3DAFC4]/15 border border-[#3DAFC4]/25 flex items-center justify-center">
              <svg class="w-3 h-3 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            </span>
            {{ phone1 }}
          </a>
          <span class="w-px h-3.5 bg-white/15"></span>
          <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-[#25D366]/15 border border-[#25D366]/25 flex items-center justify-center">
              <svg class="w-3 h-3 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </span>
            {{ phone2 }}
          </a>
          <span class="w-px h-3.5 bg-white/15"></span>
          <a :href="emailHref" class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-[#3DAFC4]/15 border border-[#3DAFC4]/25 flex items-center justify-center">
              <svg class="w-3 h-3 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </span>
            {{ email }}
          </a>
        </div>
        <!-- Language Switcher -->
        <div class="flex items-center gap-1" role="group" aria-label="Dil seçimi">
          <button
            @click="switchLocale('tr')"
            aria-label="Türkçe"
            :aria-current="locale === 'tr' ? 'true' : undefined"
            :class="locale === 'tr' ? 'bg-[#3DAFC4] text-white' : 'text-white/50 hover:text-white'"
            class="text-xs font-bold px-2.5 py-1 rounded-md transition-all duration-200">
            TR
          </button>
          <button
            @click="switchLocale('en')"
            aria-label="English"
            :aria-current="locale === 'en' ? 'true' : undefined"
            :class="locale === 'en' ? 'bg-[#3DAFC4] text-white' : 'text-white/50 hover:text-white'"
            class="text-xs font-bold px-2.5 py-1 rounded-md transition-all duration-200">
            EN
          </button>
        </div>
      </div>
    </div>

    <!-- STICKY HEADER + NAV (combined, white) -->
    <header class="bg-white sticky top-0 z-50 shadow-md">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center justify-between h-[70px]">

          <!-- Logo -->
          <Link href="/" class="flex-shrink-0">
            <img src="/images/logo.png" alt="4B Grup Endüstriyel Ticaret" class="h-12 w-auto">
          </Link>

          <!-- Desktop Nav -->
          <nav class="hidden lg:flex items-center gap-1">
            <Link href="/"
              class="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-colors">
              {{ trans('nav.home') }}
            </Link>

            <!-- Kurumsal dropdown -->
            <div class="relative" @mouseenter="kurumOpen = true" @mouseleave="kurumOpen = false">
              <button class="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-colors">
                {{ trans('nav.corporate') }}
                <svg class="w-3.5 h-3.5 transition-transform duration-200" :class="kurumOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <Transition enter-active-class="transition ease-out duration-150" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-show="kurumOpen" class="absolute top-full left-0 w-52 bg-white shadow-xl border-t-2 border-[#0E7A8C] z-50 py-2 rounded-b-xl">
                  <Link href="/kurumsal" class="flex items-center gap-2 px-5 py-2.5 text-sm text-gray-600 hover:bg-[#F4F6F9] hover:text-[#0E7A8C] transition-colors">
                    <svg class="w-3.5 h-3.5 text-[#0E7A8C]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    {{ trans('nav.about') }}
                  </Link>
                  <Link href="/referanslar" class="flex items-center gap-2 px-5 py-2.5 text-sm text-gray-600 hover:bg-[#F4F6F9] hover:text-[#0E7A8C] transition-colors">
                    <svg class="w-3.5 h-3.5 text-[#0E7A8C]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    {{ trans('nav.references') }}
                  </Link>
                  <Link href="/kvkk" class="flex items-center gap-2 px-5 py-2.5 text-sm text-gray-600 hover:bg-[#F4F6F9] hover:text-[#0E7A8C] transition-colors">
                    <svg class="w-3.5 h-3.5 text-[#0E7A8C]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    {{ trans('nav.kvkk') }}
                  </Link>
                </div>
              </Transition>
            </div>

            <!-- Ürünler mega dropdown -->
            <div class="relative" @mouseenter="urunOpen = true" @mouseleave="urunOpen = false">
              <Link href="/urunler" class="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-colors">
                {{ trans('nav.products') }}
                <svg class="w-3.5 h-3.5 transition-transform duration-200" :class="urunOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
              </Link>
              <Transition enter-active-class="transition ease-out duration-150" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-show="urunOpen" class="absolute top-full left-0 w-80 bg-white shadow-xl border-t-2 border-[#0E7A8C] z-50 p-4 rounded-b-xl">
                  <p class="text-[10px] font-bold tracking-widest text-[#0E7A8C] uppercase mb-3 px-1">{{ trans('nav.product_cats') }}</p>
                  <div class="grid grid-cols-2 gap-0.5">
                    <Link v-for="cat in categories" :key="cat.slug"
                      :href="`/urunler/${cat.slug}`"
                      class="group flex items-center justify-between gap-2 pl-3 pr-2 py-2 text-xs text-gray-600 hover:bg-[#F4F6F9] hover:text-[#0E7A8C] rounded-lg transition-colors">
                      <span>{{ cat.name }}</span>
                      <svg class="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                    </Link>
                  </div>
                  <div class="mt-3 pt-3 border-t border-gray-100">
                    <Link href="/urunler" class="flex items-center gap-2 text-sm font-semibold text-[#0E7A8C] hover:text-[#1B3163] transition-colors px-1">
                      {{ trans('nav.all_products') }}
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </Link>
                  </div>
                </div>
              </Transition>
            </div>

            <Link href="/projeler" class="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-colors">
              {{ trans('nav.projects') }}
            </Link>
            <Link href="/iletisim" class="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-colors">
              {{ trans('nav.contact') }}
            </Link>
          </nav>

          <!-- CTA + Hamburger -->
          <div class="flex items-center gap-3">
            <a :href="phone1Tel"
              class="hidden lg:flex items-center gap-3 bg-[#1B3163] hover:bg-[#0E7A8C] text-white pl-3 pr-5 py-2 rounded-xl transition-all duration-300 group border border-[#0E7A8C]/25 hover:border-[#0E7A8C]">
              <div class="relative flex-shrink-0">
                <div class="w-9 h-9 rounded-lg bg-[#0E7A8C] group-hover:bg-white/25 flex items-center justify-center transition-colors duration-300">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <span class="absolute inset-0 rounded-lg border-2 border-[#0E7A8C] animate-ping opacity-30 group-hover:opacity-0 transition-opacity"></span>
              </div>
              <div class="leading-tight">
                <div class="text-[10px] text-white/50 group-hover:text-white/80 font-semibold tracking-[2px] uppercase transition-colors">{{ trans('nav.call_now') }}</div>
                <div class="text-sm font-bold tracking-tight">{{ phone1 }}</div>
              </div>
            </a>
            <button @click="mobileOpen = !mobileOpen"
              :aria-label="mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'"
              :aria-expanded="mobileOpen"
              aria-controls="mobile-menu"
              class="lg:hidden p-2 text-gray-600 hover:text-[#1B3163] transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

        </div>
      </div>

      <!-- MOBILE MENU -->
      <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0 -translate-y-2">
        <div v-show="mobileOpen" id="mobile-menu" role="navigation" aria-label="Mobil menü" class="lg:hidden border-t border-gray-100 bg-white shadow-xl">
          <div class="px-4 py-3 space-y-0.5">
            <Link href="/" class="flex items-center gap-3 py-3 px-3 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-all" @click="mobileOpen=false">
              <svg class="w-4 h-4 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              {{ trans('nav.home') }}
            </Link>
            <Link href="/kurumsal" class="flex items-center gap-3 py-3 px-3 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-all" @click="mobileOpen=false">
              <svg class="w-4 h-4 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              {{ trans('nav.corporate') }}
            </Link>
            <Link href="/referanslar" class="flex items-center gap-3 py-3 px-3 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-all" @click="mobileOpen=false">
              <svg class="w-4 h-4 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {{ trans('nav.references') }}
            </Link>
            <div>
              <button @click="mobileUrunOpen = !mobileUrunOpen" class="w-full flex justify-between items-center py-3 px-3 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-all">
                <span class="flex items-center gap-3">
                  <svg class="w-4 h-4 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                  {{ trans('nav.products') }}
                </span>
                <svg class="w-4 h-4 transition-transform" :class="mobileUrunOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div v-show="mobileUrunOpen" class="pl-10 mt-1 space-y-0.5">
                <Link v-for="cat in categories" :key="cat.slug" :href="`/urunler/${cat.slug}`"
                  class="flex items-center py-2 pl-3 pr-3 text-sm text-gray-500 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-all" @click="mobileOpen=false">
                  {{ cat.name }}
                </Link>
              </div>
            </div>
            <Link href="/projeler" class="flex items-center gap-3 py-3 px-3 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-all" @click="mobileOpen=false">
              <svg class="w-4 h-4 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              {{ trans('nav.projects') }}
            </Link>
            <Link href="/iletisim" class="flex items-center gap-3 py-3 px-3 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-all" @click="mobileOpen=false">
              <svg class="w-4 h-4 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              {{ trans('nav.contact') }}
            </Link>
            <!-- Mobile Language Switcher -->
            <div class="flex items-center gap-2 px-3 py-2 border-t border-gray-100 mt-1">
              <span class="text-xs text-gray-500 font-semibold">{{ trans('common.lang_label') }}</span>
              <button @click="switchLocale('tr')"
                :class="locale === 'tr' ? 'bg-[#1B3163] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
                class="text-xs font-bold px-3 py-1 rounded-lg transition-all">TR</button>
              <button @click="switchLocale('en')"
                :class="locale === 'en' ? 'bg-[#1B3163] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
                class="text-xs font-bold px-3 py-1 rounded-lg transition-all">EN</button>
            </div>
            <div class="pt-2 pb-1">
              <a :href="phone1Tel" class="flex items-center justify-center gap-2 w-full bg-[#0E7A8C] text-white py-3 rounded-xl text-sm font-bold">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                {{ phone1 }}
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </header>

    <!-- PAGE CONTENT -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- FLOATING CONTACT BUTTONS -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 -translate-x-4"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-4"
    >
      <div v-show="showBackToTop" class="fixed left-0 bottom-6 z-50 flex flex-col items-start gap-2.5">
        <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer"
          aria-label="WhatsApp ile iletişime geçin"
          class="flex items-center gap-2.5 bg-[#1B3163] hover:bg-[#0E7A8C] hover:pl-5 hover:translate-x-1 text-white pl-4 pr-1.5 py-1.5 rounded-r-full shadow-lg shadow-black/10 transition-all duration-300">
          <span class="text-sm font-bold whitespace-nowrap">WhatsApp</span>
          <span class="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </span>
        </a>
        <a :href="phone1Tel"
          aria-label="Bizi arayın"
          class="flex items-center gap-2.5 bg-[#1B3163] hover:bg-[#0E7A8C] hover:pl-5 hover:translate-x-1 text-white pl-4 pr-1.5 py-1.5 rounded-r-full shadow-lg shadow-black/10 transition-all duration-300">
          <span class="text-sm font-bold whitespace-nowrap">Bizi Arayın</span>
          <span class="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          </span>
        </a>
      </div>
    </Transition>

    <!-- BACK TO TOP BUTTON -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <button
        v-show="showBackToTop"
        @click="scrollToTop"
        aria-label="Sayfanın başına dön"
        class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#1B3163] hover:bg-[#0E7A8C] text-white shadow-lg shadow-[#1B3163]/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/>
        </svg>
      </button>
    </Transition>

    <!-- FOOTER -->
    <footer class="bg-[#0e1e3d] text-white">
      <div class="max-w-7xl mx-auto px-6 pt-16 pb-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- Col 1: Company -->
        <div class="md:col-span-1">
          <img src="/images/logo-dark.png" alt="4B Grup" class="h-10 w-auto mb-5 opacity-90">
          <p class="text-white/45 text-sm leading-relaxed mb-6">{{ footerText || trans('footer.about_text') }}</p>
          <!-- Sosyal Medya -->
          <div class="flex items-center gap-2">
            <a v-if="facebook" :href="facebook" target="_blank" rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-200 group">
              <svg class="w-4 h-4 text-white/50 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a v-if="instagram" :href="instagram" target="_blank" rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:border-transparent transition-all duration-200 group">
              <svg class="w-4 h-4 text-white/50 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a v-if="linkedin" :href="linkedin" target="_blank" rel="noopener noreferrer"
              class="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-200 group">
              <svg class="w-4 h-4 text-white/50 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div>
          <h3 class="text-xs font-bold tracking-[3px] text-[#3DAFC4] uppercase mb-6">{{ trans('footer.quick_links') }}</h3>
          <ul class="space-y-3">
            <li>
              <Link href="/" class="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group">
                <span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"></span>
                {{ trans('nav.home') }}
              </Link>
            </li>
            <li>
              <Link href="/kurumsal" class="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group">
                <span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"></span>
                {{ trans('nav.corporate') }}
              </Link>
            </li>
            <li>
              <Link href="/urunler" class="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group">
                <span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"></span>
                {{ trans('nav.products') }}
              </Link>
            </li>
            <li>
              <Link href="/projeler" class="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group">
                <span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"></span>
                {{ trans('nav.projects') }}
              </Link>
            </li>
            <li>
              <Link href="/iletisim" class="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group">
                <span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"></span>
                {{ trans('nav.contact') }}
              </Link>
            </li>
            <li>
              <Link href="/referanslar" class="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group">
                <span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"></span>
                {{ trans('nav.references') }}
              </Link>
            </li>
            <li>
              <Link href="/kvkk" class="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group">
                <span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"></span>
                {{ trans('nav.kvkk') }}
              </Link>
            </li>
          </ul>
        </div>

        <!-- Col 3: Categories -->
        <div>
          <h3 class="text-xs font-bold tracking-[3px] text-[#3DAFC4] uppercase mb-6">{{ trans('footer.product_cats') }}</h3>
          <ul class="space-y-3">
            <li v-for="cat in categories" :key="cat.slug">
              <Link :href="`/urunler/${cat.slug}`" class="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group">
                <span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"></span>
                {{ cat.name }}
              </Link>
            </li>
          </ul>
        </div>

        <!-- Col 4: Contact -->
        <div>
          <h3 class="text-xs font-bold tracking-[3px] text-[#3DAFC4] uppercase mb-6">{{ trans('footer.contact') }}</h3>
          <ul class="space-y-5">
            <li class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <div>
                <a :href="phone1Tel" class="block text-sm text-white/55 hover:text-white transition-colors">{{ phone1 }}</a>
                <a :href="phone2Tel" class="block text-sm text-white/55 hover:text-white transition-colors mt-1">{{ phone2 }}</a>
              </div>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <a :href="emailHref" class="text-sm text-white/55 hover:text-white transition-colors">{{ email }}</a>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <span class="text-sm text-white/55">{{ address }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/8 py-5">
        <div class="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p class="text-white/25 text-xs">© {{ new Date().getFullYear() }} 4B Grup Endüstriyel Ticaret. {{ trans('footer.rights') }}</p>
          <p class="text-white/20 text-xs">{{ trans('footer.tagline') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>
