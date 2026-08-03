<script setup>
import { ref, computed } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import { useLocale } from '@/composables/useLocale.js'
import AppLayout from '@/Layouts/AppLayout.vue'

const props = defineProps({
    project:       { type: Object, required: true },
    otherProjects: { type: Array, default: () => [] },
})

const { trans, field } = useLocale()
const st = computed(() => usePage().props.siteSettings || {})
const phone1Tel = computed(() => st.value.phone1 ? st.value.phone1.replace(/\s/g, '') : '+903462250000')
const whatsappLink = computed(() => `https://wa.me/${st.value.whatsapp || '905356600060'}`)

const images = props.project.image_urls && props.project.image_urls.length > 0 ? props.project.image_urls : []
const activeImage = ref(0)

const localizedProject = computed(() => ({
    ...props.project,
    title:       field(props.project, 'title')       || props.project.title,
    description: field(props.project, 'description') || props.project.description,
    location:    field(props.project, 'location')     || props.project.location,
}))

const localizedOthers = computed(() =>
    props.otherProjects.map(p => ({ ...p, title: field(p, 'title') || p.title }))
)
</script>

<template>
    <AppLayout>
        <!-- ═══════════════════════════════════════
             HERO — ana proje görseli
        ═══════════════════════════════════════ -->
        <section class="relative bg-[#0e1e3d] overflow-hidden">
            <div class="relative h-[42vh] min-h-[320px] max-h-[520px]">
                <img v-if="images.length > 0" :src="images[0]" :alt="localizedProject.title"
                    class="absolute inset-0 w-full h-full object-cover"/>
                <div v-else class="absolute inset-0" style="background: linear-gradient(135deg,#0e1e3d 0%,#1B3163 60%,#1e3a72 100%)"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-[#0e1e3d] via-[#0e1e3d]/50 to-[#0e1e3d]/10"></div>

                <div class="absolute inset-0 flex flex-col justify-end">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10">
                        <Link href="/projeler" class="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-semibold mb-5 transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                            {{ trans('common.back') }}
                        </Link>
                        <span v-if="localizedProject.location" class="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
                            <svg class="w-3.5 h-3.5 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            {{ localizedProject.location }}
                        </span>
                        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
                            {{ localizedProject.title }}
                        </h1>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════
             İÇERİK
        ═══════════════════════════════════════ -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-3 gap-12">
                    <!-- Açıklama + galeri -->
                    <div class="lg:col-span-2">
                        <div v-if="localizedProject.description" class="prose prose-gray max-w-none mb-10">
                            <p class="text-[#666] leading-relaxed text-base whitespace-pre-line">{{ localizedProject.description }}</p>
                        </div>

                        <div v-if="images.length > 1">
                            <h2 class="text-lg font-black text-[#1B3163] mb-4">{{ trans('projects.gallery') }}</h2>
                            <div class="rounded-2xl overflow-hidden aspect-video mb-4 border border-gray-100 bg-gray-50">
                                <img :src="images[activeImage]" :alt="`${localizedProject.title} - ${activeImage + 1}`" class="w-full h-full object-cover"/>
                            </div>
                            <div class="flex gap-3 flex-wrap">
                                <button v-for="(img, idx) in images" :key="idx" @click="activeImage = idx"
                                    :class="['w-20 h-20 rounded-xl overflow-hidden border-2 transition-all', activeImage === idx ? 'border-[#0E7A8C] shadow-md' : 'border-gray-200 hover:border-[#0E7A8C]/50']">
                                    <img :src="img" :alt="`${localizedProject.title} - ${idx + 1}`" loading="lazy" class="w-full h-full object-cover"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- CTA -->
                    <div>
                        <div class="bg-gray-50 rounded-2xl p-6 space-y-4 sticky top-24">
                            <h3 class="font-bold text-[#1B3163] text-lg">{{ trans('projects.cta_h') }}</h3>
                            <p class="text-[#666] text-sm">{{ trans('projects.cta_p') }}</p>
                            <div class="grid grid-cols-1 gap-3">
                                <a :href="`tel:${phone1Tel}`"
                                    class="flex items-center justify-center gap-2 bg-[#1B3163] hover:bg-[#0E7A8C] text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                    </svg>
                                    {{ trans('products.call') }}
                                </a>
                                <Link href="/iletisim"
                                    class="flex items-center justify-center gap-2 bg-[#0E7A8C] hover:bg-[#0B6575] text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                    {{ trans('products.send_msg') }}
                                </Link>
                                <a :href="whatsappLink" target="_blank"
                                    class="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                    {{ trans('products.whatsapp') }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════
             DİĞER PROJELER
        ═══════════════════════════════════════ -->
        <section v-if="localizedOthers.length > 0" class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-2xl sm:text-3xl font-black text-[#1B3163] mb-8">{{ trans('projects.other_projects') }}</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link v-for="other in localizedOthers" :key="other.id" :href="`/projeler/${other.slug}`"
                        class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div class="relative h-52 bg-[#1B3163] overflow-hidden">
                            <img v-if="other.image_urls && other.image_urls[0]" :src="other.image_urls[0]" :alt="other.title"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                            <div v-else class="absolute inset-0 flex items-center justify-center" style="background: linear-gradient(135deg,#0e1e3d 0%,#1B3163 60%,#1e3a72 100%)">
                                <svg class="w-12 h-12 text-[#3DAFC4]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                </svg>
                            </div>
                        </div>
                        <div class="p-5">
                            <h3 class="font-extrabold text-[#0e1e3d] text-base group-hover:text-[#0E7A8C] transition-colors">{{ other.title }}</h3>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    </AppLayout>
</template>
