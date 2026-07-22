<script setup>
import { ref, computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import { useLocale } from '@/composables/useLocale.js'
import AppLayout from '@/Layouts/AppLayout.vue'

const { locale, trans, field } = useLocale()

const props = defineProps({
    projects:    { type: Array, default: () => [] },
    partners:    { type: Array, default: () => [] },
    pageContent: { type: Object, default: () => ({}) },
})

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
        logo_url: p.logo ? (p.logo.startsWith('http') ? p.logo : '/storage/' + p.logo) : (p.logo_url || null),
    }))
)

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()
}

const c = (key, fallback = '') => props.pageContent[key] || fallback

const selectedProject = ref(null)
const selectedImageIndex = ref(0)

function openProject(project) {
    selectedProject.value = project
    selectedImageIndex.value = 0
}
function closeModal() { selectedProject.value = null }

const defaultProjects = [
    { id: 1, title: '5 Yıldızlı Otel — Merkez Mutfak Donanımı', description: '800 m² ana mutfak alanı için eksiksiz proje yönetimi. Pişirme grupları, endüstriyel soğutma, bulaşıkhane sistemleri ve paslanmaz mutfak ekipmanları anahtar teslim olarak kuruldu.', location: 'Sivas', images: null },
    { id: 2, title: 'Üniversite Hastanesi — Merkezi Mutfak Projesi', description: 'Günlük 1.200 porsiyon kapasiteli merkezi mutfak kurulumu. Sıcak yemek hatları, soğuk depo sistemleri ve HACCP uyumlu hazırlık ekipmanları komple devreye alındı.', location: 'Ankara', images: null },
    { id: 3, title: 'Fine Dining Restoran — Mutfak Tasarımı ve Kurulum', description: '120 kişilik fine dining restoran için ergonomik mutfak planı, enerji verimli pişirme sistemleri ve profesyonel hazırlık ekipmanları ile anahtar teslim kurulum.', location: 'İstanbul', images: null },
    { id: 4, title: 'Üniversite Yemekhanesi — Toplu Yemek Altyapısı', description: 'Günlük 2.500 öğrenci kapasitesinde hat ekipmanları, endüstriyel bulaşık sistemleri ve dağıtım üniteleri dahil komple yemekhane modernizasyonu.', location: 'Kayseri', images: null },
    { id: 5, title: 'Toplu Yemek Üretim Tesisi — Kapasite Artırımı', description: 'Mevcut tesisin yeniden yapılandırılması; soğuk zincir sistemleri, paslanmaz mutfak hatları ve HACCP uyumlu üretim altyapısı ile günlük kapasite 3.000 porsiyona yükseltildi.', location: 'Sivas', images: null },
    { id: 6, title: 'AVM Food Court — Merkezi Hazırlık Mutfağı', description: '6 farklı mutfak konseptine hizmet veren merkezi hazırlık mutfağı planı ve ekipman kurulumu. Ortak pişirme grupları, soğutma ve depolama sistemleri tek proje kapsamında tamamlandı.', location: 'Malatya', images: null },
]

const displayProjects = computed(() => props.projects.length > 0 ? props.projects : defaultProjects)

const sectors = computed(() => [
    { label: trans('home.sector_hotel'),       icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { label: trans('home.sector_restaurant'),  icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: trans('home.sector_hospital'),    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { label: trans('home.sector_education'),   icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' },
    { label: trans('home.sector_catering'),    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { label: trans('home.sector_corporate'),   icon: 'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z' },
])
</script>

<template>
  <AppLayout>

    <!-- ═══════════════════════════════════════
         HERO
    ═══════════════════════════════════════ -->
    <section class="relative overflow-hidden bg-[#1B3163] py-20">
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10" style="background: radial-gradient(circle at 70% 50%, #3DAFC4 0%, transparent 60%);"></div>

      <div class="relative max-w-7xl mx-auto px-6">
        <div class="max-w-3xl">
          <h1 class="text-white font-extrabold leading-tight mb-5" style="font-size: clamp(2rem, 4.5vw, 3rem);">
            {{ c('proj_hero_title', 'Anahtar Teslim Endüstriyel Mutfak Projeleri') }}
          </h1>
          <p class="text-white/60 text-lg leading-relaxed max-w-2xl">
            {{ c('proj_hero_desc', 'Restoran, otel, hastane ve catering işletmelerine özel endüstriyel mutfak tasarımı ve kurulumu. İhtiyaç analizinden teslimata kadar anahtar teslim çözümler.') }}
          </p>
        </div>
      </div>

    </section>

    <!-- ═══════════════════════════════════════
         SEKTÖRLER STRIP
    ═══════════════════════════════════════ -->
    <section class="bg-white border-b border-gray-100 py-5">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center gap-2 overflow-x-auto">
          <span class="text-[10px] font-black text-gray-500 tracking-[3px] uppercase whitespace-nowrap flex-shrink-0 hidden sm:inline">{{ trans('projects.sectors_label') }}</span>
          <span v-for="s in sectors" :key="s.label"
            class="flex items-center gap-1.5 bg-[#f4f5f6] border border-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0">
            <svg class="w-3.5 h-3.5 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" :d="s.icon"/>
            </svg>
            {{ s.label }}
          </span>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         PROJECTS GRID
    ═══════════════════════════════════════ -->
    <section class="py-20 bg-[#f4f5f6]">
      <div class="max-w-7xl mx-auto px-6">

        <div class="text-center mb-14">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Tamamlanan Projeler</p>
          <h2 class="text-4xl font-extrabold text-[#0e1e3d]">{{ c('proj_grid_title', 'Projeler') }}</h2>
          <p v-if="c('proj_grid_desc')" class="text-gray-500 mt-4 text-[15px]">{{ c('proj_grid_desc') }}</p>
          <p v-else class="text-gray-500 mt-4 text-[15px]">Otel ve resort tesislerinden hastane merkezi mutfaklarına, catering üretim tesislerinden kurumsal yemekhanelere — farklı sektör ve ölçeklerde tamamlanan endüstriyel mutfak projeleri.</p>
        </div>

        <div v-if="displayProjects.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="project in displayProjects" :key="project.id"
            @click="openProject(project)"
            class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border border-transparent hover:border-[#3DAFC4]/20">

            <!-- Image -->
            <div class="relative h-60 overflow-hidden bg-[#1B3163]">
              <img v-if="project.images && project.images[0]"
                :src="project.images[0]" :alt="field(project,'title') || project.title"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
              <div v-else class="absolute inset-0 flex flex-col items-center justify-center"
                style="background: linear-gradient(135deg,#0e1e3d 0%,#1B3163 60%,#1e3a72 100%)">
                <svg class="w-14 h-14 text-[#3DAFC4]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-[#0e1e3d]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span class="bg-[#0E7A8C] text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide flex items-center gap-2">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  {{ trans('projects.inspect') }}
                </span>
              </div>
              <div v-if="project.location" class="absolute top-4 left-4 flex items-center gap-1.5 bg-[#0e1e3d]/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                <svg class="w-3 h-3 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {{ field(project,'location') || project.location }}
              </div>
            </div>

            <div class="p-6">
              <h3 class="font-extrabold text-[#0e1e3d] text-base leading-tight mb-2 group-hover:text-[#0E7A8C] transition-colors">
                {{ field(project,'title') || project.title }}
              </h3>
              <p v-if="field(project,'description') || project.description"
                class="text-gray-500 text-sm leading-relaxed line-clamp-2">
                {{ field(project,'description') || project.description }}
              </p>
              <div class="flex items-center gap-1 mt-4 text-[#0E7A8C] text-xs font-bold">
                {{ trans('products.view_details') }}
                <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-24">
          <div class="w-20 h-20 bg-[#3DAFC4]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg class="w-10 h-10 text-[#3DAFC4]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <h3 class="text-[#0e1e3d] font-extrabold text-xl mb-2">{{ trans('projects.no_project_h') }}</h3>
          <p class="text-gray-500">{{ trans('projects.no_project_p') }}</p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         MODAL
    ═══════════════════════════════════════ -->
    <Teleport to="body">
      <Transition enter-active-class="transition duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100"
        leave-active-class="transition duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="selectedProject" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeModal">
          <div class="absolute inset-0 bg-[#0e1e3d]/80 backdrop-blur-sm" @click="closeModal"></div>
          <div class="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10">
            <div class="relative">
              <img v-if="selectedProject.images && selectedProject.images[selectedImageIndex]"
                :src="selectedProject.images[selectedImageIndex]"
                :alt="field(selectedProject,'title') || selectedProject.title"
                class="w-full h-72 object-cover rounded-t-2xl"/>
              <div v-else class="w-full h-72 rounded-t-2xl flex items-center justify-center"
                style="background:linear-gradient(135deg,#0e1e3d 0%,#1B3163 100%)">
                <svg class="w-20 h-20 text-[#3DAFC4]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div v-if="selectedProject.images && selectedProject.images.length > 1"
                class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                <button v-for="(_,i) in selectedProject.images" :key="i" @click="selectedImageIndex = i"
                  class="h-2 rounded-full transition-all"
                  :class="i === selectedImageIndex ? 'w-5 bg-[#3DAFC4]' : 'w-2 bg-white/50'">
                </button>
              </div>
              <button @click="closeModal"
                class="absolute top-4 right-4 w-9 h-9 bg-[#0e1e3d]/60 hover:bg-[#0e1e3d] text-white rounded-full flex items-center justify-center transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div class="p-7">
              <div class="flex items-start justify-between gap-4 mb-4">
                <h2 class="text-2xl font-extrabold text-[#0e1e3d] leading-tight">{{ field(selectedProject,'title') || selectedProject.title }}</h2>
                <span v-if="selectedProject.location" class="flex items-center gap-1.5 text-sm text-gray-500 bg-[#f4f5f6] px-3 py-1.5 rounded-full flex-shrink-0 font-semibold">
                  <svg class="w-3.5 h-3.5 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {{ field(selectedProject,'location') || selectedProject.location }}
                </span>
              </div>
              <p v-if="field(selectedProject,'description') || selectedProject.description"
                class="text-gray-500 leading-relaxed text-[15px]">{{ field(selectedProject,'description') || selectedProject.description }}</p>
              <div class="mt-7 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <Link href="/iletisim"
                  class="flex-1 flex items-center justify-center gap-2 bg-[#1B3163] hover:bg-[#0E7A8C] text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
                  {{ trans('projects.quote') }}
                </Link>
                <button @click="closeModal"
                  class="flex-1 border border-gray-200 hover:border-gray-300 text-gray-500 font-bold py-3.5 rounded-xl transition-colors text-sm">
                  {{ trans('projects.close') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </AppLayout>
</template>

