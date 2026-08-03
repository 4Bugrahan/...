<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Link } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import { useLocale } from '@/composables/useLocale.js'

const props = defineProps({
    sliders:          { type: Array,  default: () => [] },
    categories:       { type: Array,  default: () => [] },
    partners:         { type: Array,  default: () => [] },
    featuredProducts: { type: Array,  default: () => [] },
    recentProjects:   { type: Array,  default: () => [] },
    pageContent:      { type: Object, default: () => ({}) },
})

// Kısa yardımcı: panelden değer varsa onu, yoksa varsayılanı kullan
const c = (key, fallback = '') => props.pageContent[key] ?? fallback

const { locale, trans, field } = useLocale()

const aboutImageError = ref(false)
const aboutImageUrl = computed(() => {
  const url = c('about_image', '')
  return (url && typeof url === 'string') ? url : ''
})

let autoplay = null

const activePanel = ref(0)

const defaultHeroPanels = computed(() => [
    {
        label: trans('home.hero1_label'),
        title: trans('home.hero1_title'),
        desc:  trans('home.hero1_desc'),
        btn:   trans('home.hero1_btn'),
        href: '/urunler',
        bg: 'linear-gradient(160deg, #0a1628 0%, #17305a 100%)',
    },
    {
        label: trans('home.hero2_label'),
        title: trans('home.hero2_title'),
        desc:  trans('home.hero2_desc'),
        btn:   trans('home.hero2_btn'),
        href: '/projeler',
        bg: 'linear-gradient(160deg, #071220 0%, #0d2540 100%)',
    },
])

const bgGradients = [
    'linear-gradient(160deg, #0a1628 0%, #17305a 100%)',
    'linear-gradient(160deg, #071220 0%, #0d2540 100%)',
]

const heroVideos = { 0: '/videos/hero1.mp4', 1: '/videos/hero2.mp4' }
const heroVideoPosters = { 0: '/videos/hero1-poster.jpg', 1: '/videos/hero2-poster.jpg' }

const heroPanels = computed(() => {
    if (!props.sliders || props.sliders.length === 0) return defaultHeroPanels.value
    return props.sliders.map((s, i) => ({
        label: field(s, 'subtitle') || s.subtitle || defaultHeroPanels.value[i]?.label || '',
        title: field(s, 'title')    || s.title    || defaultHeroPanels.value[i]?.title || '',
        desc:  field(s, 'description') || s.description || defaultHeroPanels.value[i]?.desc || '',
        btn:   field(s, 'btn1_text') || s.btn1_text || defaultHeroPanels.value[i]?.btn || '',
        href:  s.btn1_url || defaultHeroPanels.value[i]?.href || '/',
        bg:    bgGradients[i % bgGradients.length],
        image: s.image || null,
        video: heroVideos[i] || null,
        videoPoster: heroVideoPosters[i] || null,
    }))
})

function nextPanel() {
    activePanel.value = (activePanel.value + 1) % heroPanels.value.length
}

function startAutoplay() { autoplay = setInterval(nextPanel, 5500) }
function stopAutoplay() { if (autoplay) clearInterval(autoplay) }

onMounted(() => startAutoplay())
onUnmounted(() => stopAutoplay())

const features = computed(() => [
    { title: trans('home.feat_quality'), text: trans('home.feat_quality_d') },
    { title: trans('home.feat_setup'),   text: trans('home.feat_setup_d') },
    { title: trans('home.feat_warranty'),text: trans('home.feat_warranty_d') },
    { title: trans('home.feat_support'), text: trans('home.feat_support_d') },
    { title: trans('home.feat_project'), text: trans('home.feat_project_d') },
    { title: trans('home.feat_brands'),  text: trans('home.feat_brands_d') },
])

const serviceSteps = computed(() => [
    {
        num: '01', title: trans('home.step1_title'),
        desc: trans('home.step1_desc'),
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    },
    {
        num: '02', title: trans('home.step2_title'),
        desc: trans('home.step2_desc'),
        icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    },
    {
        num: '03', title: trans('home.step3_title'),
        desc: trans('home.step3_desc'),
        icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
    },
    {
        num: '04', title: trans('home.step4_title'),
        desc: trans('home.step4_desc'),
        icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
    },
    {
        num: '05', title: trans('home.step5_title'),
        desc: trans('home.step5_desc'),
        icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
    },
])

const sectors = computed(() => [
    {
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        title: trans('home.sector_restaurant'),
    },
    {
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
        title: trans('home.sector_hotel'),
    },
    {
        icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        title: trans('home.sector_hospital'),
    },
    {
        icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
        title: trans('home.sector_education'),
    },
    {
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
        title: trans('home.sector_catering'),
    },
    {
        icon: 'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z',
        title: trans('home.sector_corporate'),
    },
])

const defaultProjects = computed(() => [
    { id: 1, title: trans('home.def_proj1_title'), description: trans('home.def_proj1_desc'), location: 'Sivas', images: null },
    { id: 2, title: trans('home.def_proj2_title'), description: trans('home.def_proj2_desc'), location: 'Kayseri', images: null },
    { id: 3, title: trans('home.def_proj3_title'), description: trans('home.def_proj3_desc'), location: 'Sivas', images: null },
])

const defaultPartners = [
    { id: 1, name: 'MKN', logo_url: null },
    { id: 2, name: 'Rational', logo_url: null },
    { id: 3, name: 'Welbilt', logo_url: null },
    { id: 4, name: 'Hobart', logo_url: null },
    { id: 5, name: 'Electrolux', logo_url: null },
    { id: 6, name: 'Unox', logo_url: null },
    { id: 7, name: 'True', logo_url: null },
    { id: 8, name: 'Manitowoc', logo_url: null },
    { id: 9, name: 'Meiko', logo_url: null },
    { id: 10, name: 'Winterhalter', logo_url: null },
    { id: 11, name: 'Lainox', logo_url: null },
    { id: 12, name: 'Giorik', logo_url: null },
]

const displayPartners = computed(() =>
    (props.partners.length ? props.partners : defaultPartners).map(p => ({
        ...p,
        name: field(p, 'name') || p.name,
    }))
)

const references = [
    { name: 'Coffee & Study', logo_url: '/images/references/coffee-study.jpg?v=2' },
    { name: 'Colombia Coffee', logo_url: '/images/references/colombia-coffee.jpg?v=2' },
    { name: "Gloria Jean's", logo_url: '/images/references/gloria-jeans.jpg?v=2' },
    { name: 'T.C. Gençlik ve Spor Bakanlığı', logo_url: '/images/references/gsb.png?v=2' },
    { name: 'T.C. Millî Eğitim Bakanlığı', logo_url: '/images/references/meb.png?v=2' },
    { name: 'T.C. Millî Savunma Bakanlığı', logo_url: '/images/references/msb.png?v=2' },
    { name: 'T.C. Sağlık Bakanlığı', logo_url: '/images/references/saglik-bakanligi.png?v=2' },
    { name: 'Sivas Bilim ve Teknoloji Üniversitesi', logo_url: '/images/references/sivas-bilim-teknoloji.jpg?v=2' },
    { name: 'Sivas Cumhuriyet Üniversitesi', logo_url: '/images/references/sivas-cumhuriyet.png?v=2' },
    { name: 'TANAP', logo_url: '/images/references/tanap.png?v=2' },
    { name: 'Turgut Fırat Proje İnşaat A.Ş.', logo_url: '/images/references/turgut-firat.png?v=2' },
].map((r, i) => ({ ...r, id: `ref-${i}` }))

const displayCategories = computed(() =>
    props.categories.map(c => ({ ...c, name: field(c, 'name') || c.name }))
)

// Kategori kapak görseli — gerçek ürün fotoğrafı (public/images/categories/{slug}.jpeg)
const FRAME_IMAGE = '/images/category-frame.jpeg?v=2'
const getCoverImage = (slug) => `/images/categories-transparent/${slug}.png?v=2`

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()
}
</script>

<template>
  <AppLayout>

    <!-- ═══════════════════════════════════════
         HERO — ACCORDION PANELS (mygastro style)
    ═══════════════════════════════════════ -->
    <section class="relative h-[calc(100vh-70px)] md:h-[calc(100vh-108px)]">

      <!-- Desktop: horizontal accordion -->
      <div class="hidden lg:flex h-full">
        <div
          v-for="(panel, i) in heroPanels" :key="i"
          class="relative overflow-hidden cursor-pointer transition-all duration-700 ease-in-out"
          :style="`flex: ${activePanel === i ? 1.7 : 1};`"
          @mouseenter="activePanel = i"
        >
          <!-- Background: video varsa video, görsel varsa fotoğraf, yoksa gradient -->
          <video v-if="panel.video" class="absolute inset-0 w-full h-full object-cover"
            autoplay muted loop playsinline :poster="panel.videoPoster || undefined">
            <source :src="panel.video" type="video/mp4">
          </video>
          <div v-else class="absolute inset-0 transition-all duration-700"
               :style="panel.image
                 ? `background-image: url('${panel.image}'); background-size: cover; background-position: center;`
                 : `background: ${panel.bg};`">
          </div>

          <!-- Dot texture (sadece görselsiz/videosuz panellerde) -->
          <div v-if="!panel.image && !panel.video" class="absolute inset-0 opacity-[0.04]"
            style="background-image: radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px); background-size: 28px 28px;">
          </div>

          <!-- Vignette overlay — görselsiz panellerde ve okunabilirlik için videolu panellerde -->
          <div v-if="!panel.image || panel.video" class="absolute inset-0"
               style="background: linear-gradient(to top, rgba(0,8,22,0.90) 0%, rgba(0,8,22,0.30) 55%, transparent 100%)">
          </div>

          <!-- Left separator -->
          <div v-if="i > 0" class="absolute left-0 top-0 bottom-0 w-px bg-white/12 z-10"></div>

          <!-- Top accent line -->
          <div class="absolute top-0 left-0 right-0 h-[3px] z-10 transition-colors duration-500"
            :class="activePanel === i ? 'bg-[#3DAFC4]' : 'bg-white/8'">
          </div>

          <!-- Content -->
          <div class="relative z-10 h-full flex flex-col justify-end px-14 pb-16">

            <!-- Title -->
            <h2 class="text-white font-black leading-[1.05] mb-6 transition-all duration-700"
              :class="activePanel === i ? 'text-5xl' : 'text-2xl'"
              v-html="panel.title.replace(/\n/g, '<br>')">
            </h2>

            <!-- Description -->
            <div class="overflow-hidden transition-all duration-700"
              :style="activePanel === i ? 'max-height: 100px; opacity: 1; margin-bottom: 32px;' : 'max-height: 0; opacity: 0; margin-bottom: 0;'">
              <p class="text-white/55 text-[15px] leading-relaxed max-w-md">{{ panel.desc }}</p>
            </div>

            <!-- Button -->
            <div class="overflow-hidden transition-all duration-700"
              :style="activePanel === i ? 'max-height: 60px; opacity: 1;' : 'max-height: 0; opacity: 0;'">
              <Link :href="panel.href"
                class="inline-flex items-center gap-3 px-8 py-3.5 bg-[#0E7A8C] hover:bg-white text-white hover:text-[#0e1e3d] font-bold text-sm uppercase tracking-widest rounded-lg transition-all duration-200">
                {{ panel.btn }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile: vertical stack -->
      <div class="flex lg:hidden flex-col h-full">
        <div
          v-for="(panel, i) in heroPanels" :key="i"
          class="relative flex-1 overflow-hidden"
          :style="!panel.video && panel.image
            ? `background-image: url('${panel.image}'); background-size: cover; background-position: center;`
            : (!panel.video ? `background: ${panel.bg};` : '')"
        >
          <video v-if="panel.video" class="absolute inset-0 w-full h-full object-cover"
            autoplay muted loop playsinline :poster="panel.videoPoster || undefined">
            <source :src="panel.video" type="video/mp4">
          </video>
          <div v-if="!panel.image && !panel.video" class="absolute inset-0 opacity-[0.04]"
            style="background-image: radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px); background-size: 20px 20px;">
          </div>
          <div v-if="!panel.image || panel.video" class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,8,22,0.85) 0%, rgba(0,8,22,0.40) 100%)"></div>
          <div class="relative z-10 h-full flex flex-col justify-end px-8 pb-10">
            <h2 class="text-white font-black text-3xl leading-tight mb-5"
              v-html="panel.title.replace(/\n/g, '<br>')">
            </h2>
            <Link :href="panel.href"
              class="inline-flex items-center gap-2 px-6 py-3 bg-[#0E7A8C] text-white font-bold text-xs uppercase tracking-widest rounded-lg w-fit">
              {{ panel.btn }}
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>

      <!-- Bottom shape: flat band + narrow ^ spike at center (mygastro style) -->
      <div class="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <svg viewBox="0 0 1440 57" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="display:block; width:100%; height:57px;">
          <path d="M0,57 L0,34 L693,34 C708,34 714,3 720,0 C726,3 732,34 747,34 L1440,34 L1440,57 Z" fill="#ffffff"/>
        </svg>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         ABOUT SPLIT — LIGHT
    ═══════════════════════════════════════ -->
    <section class="bg-white py-24">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Visual -->
        <div class="flex justify-center items-center min-h-[300px]">
          <img
            v-if="aboutImageUrl && !aboutImageError"
            :src="aboutImageUrl"
            alt="4B Grup Ürün Kataloğu"
            class="max-h-[500px] w-auto rounded-2xl shadow-2xl"
            @error="aboutImageError = true"
          />
          <div v-else class="max-h-[500px] w-[400px] rounded-2xl bg-[#f4f5f6] border border-gray-200 flex items-center justify-center text-[#1B3163] font-semibold text-center px-6 py-12">
            <span v-if="aboutImageError">{{ trans('home.image_error') }}</span>
            <span v-else>{{ trans('home.image_hint') }}</span>
          </div>
        </div>

        <!-- Text -->
        <div>
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">{{ trans('home.about_label') }}</p>
          <h2 class="text-4xl font-extrabold text-[#0e1e3d] leading-tight mb-5">
            {{ c('about_title', 'Hakkımızda') }}
          </h2>
          <p class="text-gray-500 leading-relaxed mb-4 text-[15px]">
            {{ c('about_text1', '4B Grup, 2009 yılından bu yana otel, restoran, hastane ve toplu yemek tesislerine endüstriyel mutfak ekipmanları tedariki ve anahtar teslim proje hizmeti sunmaktadır. Yalnızca ekipman tedariği değil; tasarım, kurulum ve satış sonrası süreçlerin bütüncül yönetimini kapsayan kurumsal bir çözüm ortaklığı.') }}
          </p>
          <p class="text-gray-500 leading-relaxed mb-8 text-[15px]">
            {{ c('about_text2', 'CE belgeli ürün portföyü, deneyimli proje mühendisleri ve 50\'den fazla küresel markayla kurulan yetkili satış ve servis ortaklığıyla projenin her aşamasında teknik uzmanlık ve kalite güvencesi sağlanır.') }}
          </p>
          <Link href="/kurumsal"
            class="inline-flex items-center gap-2.5 bg-[#1B3163] hover:bg-[#0E7A8C] text-white px-8 py-3.5 font-bold text-sm uppercase tracking-wide rounded-lg transition-colors duration-300">
            {{ c('about_btn', 'Kurumsal Sayfamız') }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         CATEGORIES — DARK OVERLAY GRID
    ═══════════════════════════════════════ -->
    <section class="bg-[#f4f5f6] py-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-14">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">{{ trans('home.products_label') }}</p>
          <h2 class="text-4xl font-extrabold text-[#0e1e3d]">{{ c('cats_title', trans('home.cat_h')) }}</h2>
          <p class="text-gray-500 mt-4 text-[15px]">{{ c('cats_sub', trans('home.cat_sub')) }}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Link
            v-for="cat in displayCategories"
            :key="cat.slug" :href="`/urunler/${cat.slug}`"
            class="group cursor-pointer block rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(27,49,99,0.25)]"
            style="border: 1px solid #ececec; outline: none; -webkit-tap-highlight-color: transparent;">
            <!-- Kapak görseli: sabit çerçeve + üzerinde büyüyen ürün görseli -->
            <div class="relative overflow-hidden aspect-square">
              <img :src="FRAME_IMAGE" alt="" draggable="false"
                   class="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />
              <img :src="getCoverImage(cat.slug)" :alt="cat.name" draggable="false"
                   @error="$event.target.style.display = 'none'"
                   class="absolute inset-[7%] w-[86%] h-[86%] object-contain outline-none transition-transform duration-500 group-hover:scale-105" />
            </div>
            <!-- İçerik -->
            <div class="px-4 py-3" style="border-top:1px solid #f0f1f3">
              <h3 class="font-bold text-sm leading-snug truncate" style="color:#1B3163">{{ cat.name }}</h3>
              <span class="text-xs font-medium" style="color:#8b93a3">
                {{ cat.total_products_count ?? cat.products_count ?? 0 }} {{ trans('common.product_unit') }}
              </span>
            </div>
          </Link>
        </div>
        <div class="text-center mt-10">
          <Link href="/urunler"
            class="inline-flex items-center gap-2.5 border-2 border-[#1B3163] text-[#1B3163] hover:bg-[#1B3163] hover:text-white px-8 py-3.5 font-bold text-sm uppercase tracking-wide rounded-lg transition-all duration-300">
            {{ c('cats_btn', trans('home.all_cats')) }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         KATALOG İNDİR
    ═══════════════════════════════════════ -->
    <section class="relative overflow-hidden py-0">
      <!-- BG: iki renkli split -->
      <div class="absolute inset-0 flex">
        <div class="w-1/2 bg-[#0e1e3d]"></div>
        <div class="w-1/2 bg-[#1B3163]"></div>
      </div>
      <!-- Decorative grid -->
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px); background-size: 40px 40px;"></div>
      <!-- Accent glow -->
      <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at 50% 50%, rgba(61,175,196,0.12) 0%, transparent 65%);"></div>

      <div class="relative max-w-7xl mx-auto px-6">
        <div class="flex flex-col lg:flex-row items-center gap-0">

          <!-- SOL: Katalog Kapak -->
          <div class="lg:w-5/12 flex justify-center lg:justify-end py-16 lg:py-12 lg:pr-12">
            <div class="relative">
              <div class="absolute -inset-6 rounded-3xl opacity-30" style="background: radial-gradient(circle, #3DAFC4 0%, transparent 70%); filter: blur(24px);"></div>
              <div class="absolute top-2 left-3 w-full h-full bg-[#3DAFC4]/20 rounded-xl blur-sm"></div>
              <div class="absolute top-1 left-1.5 w-full h-full bg-white/5 rounded-xl"></div>
              <img
                src="/images/katalog-kapak.png"
                alt="4B Grup Ürün Kataloğu"
                class="relative z-10 w-64 sm:w-80 lg:w-72 xl:w-80 rounded-xl shadow-2xl"
                style="box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05);"
              />
              <div class="absolute -top-4 -right-4 z-20 w-16 h-16 bg-[#0E7A8C] rounded-full flex flex-col items-center justify-center shadow-lg border-4 border-[#0e1e3d]">
                <svg class="w-5 h-5 text-white mb-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/></svg>
                <span class="text-white text-[9px] font-black tracking-wide">PDF</span>
              </div>
            </div>
          </div>

          <!-- SAĞ: İçerik -->
          <div class="lg:w-7/12 py-16 lg:py-20 lg:pl-12 text-center lg:text-left">
            <h2 class="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              {{ trans('home.catalog_title1') }}
            </h2>
            <p class="text-white/55 text-[15px] leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              {{ trans('home.catalog_desc') }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="/files/katalog.pdf" download
                class="group inline-flex items-center justify-center gap-3 bg-[#0E7A8C] hover:bg-white text-white hover:text-[#1B3163] font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#3DAFC4]/20">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                {{ trans('home.catalog_download') }}
              </a>
              <Link href="/urunler"
                class="inline-flex items-center justify-center gap-2.5 border-2 border-white/20 hover:border-[#3DAFC4] text-white font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-xl hover:bg-[#3DAFC4]/10 transition-all duration-300">
                {{ trans('home.catalog_browse') }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         SON PROJELER
    ═══════════════════════════════════════ -->
    <section class="bg-white py-24">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">{{ trans('home.projects_label') }}</p>
            <h2 class="text-4xl font-extrabold text-[#0e1e3d]">{{ trans('home.projects_h') }}</h2>
          </div>
          <Link href="/projeler"
            class="inline-flex items-center gap-2 text-[#0E7A8C] hover:text-[#1B3163] text-sm font-semibold transition-colors group flex-shrink-0">
            {{ trans('home.projects_all') }}
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <!-- Project cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(project, i) in (recentProjects.length ? recentProjects : defaultProjects)"
            :key="project.id"
            class="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-[#3DAFC4]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <!-- Image / gradient bg -->
            <div class="aspect-[4/3] relative overflow-hidden bg-[#f4f5f6]">
              <img v-if="project.image_urls && project.image_urls[0]"
                :src="project.image_urls[0]" :alt="field(project,'title') || project.title"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
              <div v-else class="w-full h-full flex items-center justify-center"
                :style="`background: linear-gradient(135deg, ${['#1B3163','#0e2a5c','#163060'][i%3]} 0%, #1e3a72 100%)`">
                <svg class="w-20 h-20 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.75" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <!-- Dark gradient bottom -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <!-- Location badge -->
              <div v-if="project.location" class="absolute top-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                <svg class="w-3 h-3 text-[#3DAFC4]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <span class="text-white text-[10px] font-bold tracking-wide">{{ field(project, 'location') || project.location }}</span>
              </div>
            </div>
            <!-- Info -->
            <div class="p-6">
              <h3 class="font-extrabold text-[#0e1e3d] text-lg leading-tight mb-2 group-hover:text-[#0E7A8C] transition-colors">
                {{ field(project, 'title') || project.title }}
              </h3>
              <p class="text-gray-500 text-sm leading-relaxed line-clamp-2">
                {{ field(project, 'description') || project.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         PARTNERS — MARQUEE SLIDER
    ═══════════════════════════════════════ -->
    <section class="bg-[#f4f5f6] py-20 overflow-hidden relative">
      <!-- Header -->
      <div class="max-w-7xl mx-auto px-6 mb-12">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 class="text-4xl font-extrabold text-[#0e1e3d]">{{ trans('home.partners_section_h') }}</h2>
          </div>
        </div>
      </div>

      <!-- Left/right edge fades -->
      <div class="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10" style="background: linear-gradient(to right, #f4f5f6, transparent);"></div>
      <div class="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10" style="background: linear-gradient(to left, #f4f5f6, transparent);"></div>

      <!-- Marquee track 1 (left scroll) — referanslar -->
      <div class="marquee-container group/marquee mb-4">
        <div class="marquee-track flex gap-4">
          <!-- Items x2 for seamless loop -->
          <template v-for="n in 2" :key="n">
            <component
              v-for="partner in references" :key="`${n}-${partner.id}`"
              :is="partner.website ? 'a' : 'div'"
              :href="partner.website || undefined"
              :target="partner.website ? '_blank' : undefined"
              :rel="partner.website ? 'noopener noreferrer' : undefined"
              class="flex-shrink-0 w-52 h-36 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl px-6 hover:border-[#3DAFC4]/60 hover:shadow-md transition-all duration-300 cursor-default"
            >
              <img v-if="partner.logo_url" :src="partner.logo_url" :alt="partner.name"
                loading="lazy"
                class="max-h-24 max-w-full object-contain transition-all duration-300"/>
              <div v-else class="text-center">
                <div class="w-12 h-12 bg-[#1B3163]/10 border border-[#1B3163]/20 rounded-lg flex items-center justify-center text-[#1B3163] font-extrabold text-sm mx-auto mb-1.5">
                  {{ getInitials(partner.name) }}
                </div>
                <span class="text-xs font-semibold text-[#1B3163]/60 leading-tight block">{{ partner.name }}</span>
              </div>
            </component>
          </template>
        </div>
      </div>

      <!-- Marquee track 2 (right scroll — reversed) — iş ortakları -->
      <div class="marquee-container-reverse group/marquee2">
        <div class="marquee-track-reverse flex gap-4">
          <template v-for="n in 2" :key="n">
            <component
              v-for="partner in displayPartners" :key="`r${n}-${partner.id}`"
              :is="partner.website ? 'a' : 'div'"
              :href="partner.website || undefined"
              :target="partner.website ? '_blank' : undefined"
              :rel="partner.website ? 'noopener noreferrer' : undefined"
              class="flex-shrink-0 w-52 h-32 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl px-6 hover:border-[#3DAFC4]/60 hover:shadow-md transition-all duration-300 cursor-default"
            >
              <img v-if="partner.logo_url" :src="partner.logo_url" :alt="partner.name"
                loading="lazy"
                class="max-h-14 max-w-full object-contain opacity-60 hover:opacity-100 transition-all duration-300"/>
              <div v-else class="text-center">
                <div class="w-12 h-12 bg-[#1B3163]/10 border border-[#1B3163]/20 rounded-lg flex items-center justify-center text-[#1B3163] font-extrabold text-sm mx-auto mb-1.5">
                  {{ getInitials(partner.name) }}
                </div>
                <span class="text-xs font-semibold text-[#1B3163]/60 leading-tight block">{{ partner.name }}</span>
              </div>
            </component>
          </template>
        </div>
      </div>

    </section>

  </AppLayout>
</template>

<style scoped>
/* ── Marquee: left scroll ── */
.marquee-container {
  overflow: hidden;
  position: relative;
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-left 30s linear infinite;
}
.marquee-container:hover .marquee-track {
  animation-play-state: paused;
}
@keyframes marquee-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ── Marquee: right scroll (reversed) ── */
.marquee-container-reverse {
  overflow: hidden;
  position: relative;
}
.marquee-track-reverse {
  display: flex;
  width: max-content;
  animation: marquee-right 35s linear infinite;
}
.marquee-container-reverse:hover .marquee-track-reverse {
  animation-play-state: paused;
}
@keyframes marquee-right {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
</style>
