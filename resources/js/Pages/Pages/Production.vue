<script setup>
import { ref } from 'vue'
import AppLayout from '@/Layouts/AppLayout.vue'
import { useLocale } from '@/composables/useLocale.js'

const { trans } = useLocale()

// ── Medya yer tutucuları ──────────────────────────────────────────────────
// Görsel/gif hazır olduğunda ilgili `image`/`video` alanına dosya yolunu
// yazmanız yeterli (örn. '/images/production/lazer-kesim.gif') — placeholder
// otomatik olarak kaybolur, başka bir değişiklik gerekmez.

const laserMedia = ref({ image: null, video: null })
const bendMedia = ref({ image: null, video: null })

const productionCards = [
    { key: 1, titleKey: 'production.card1_title', descKey: 'production.card1_desc', image: null, icon: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125' },
    { key: 2, titleKey: 'production.card2_title', descKey: 'production.card2_desc', image: null, icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085' },
    { key: 3, titleKey: 'production.card3_title', descKey: 'production.card3_desc', image: null, icon: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z' },
]

const gallerySlides = ref([
    { image: null }, { image: null }, { image: null }, { image: null },
    { image: null }, { image: null }, { image: null },
])

const galleryTrack = ref(null)
function scrollGallery(dir) {
    if (!galleryTrack.value) return
    galleryTrack.value.scrollBy({ left: galleryTrack.value.clientWidth * 0.85 * dir, behavior: 'smooth' })
}
</script>

<template>
    <AppLayout>
        <!-- ═══════════════════════════════════════
             HERO — Lazer kesim gif/görseli
        ═══════════════════════════════════════ -->
        <section class="relative bg-gradient-to-br from-[#1B3163] to-[#0e1e3d] overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div class="max-w-3xl mb-12">
                    <p class="text-xs font-semibold text-[#3DAFC4] uppercase tracking-widest mb-3">{{ trans('production.hero_eyebrow') }}</p>
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                        {{ trans('production.hero_title') }}
                    </h1>
                    <p class="text-white/70 text-lg leading-relaxed">
                        {{ trans('production.hero_desc') }}
                    </p>
                </div>

                <!-- Lazer kesim medya alanı -->
                <div class="relative w-full aspect-[16/8] rounded-2xl overflow-hidden border border-white/10">
                    <video v-if="laserMedia.video" class="absolute inset-0 w-full h-full object-cover" autoplay muted loop playsinline>
                        <source :src="laserMedia.video" type="video/mp4">
                    </video>
                    <img v-else-if="laserMedia.image" :src="laserMedia.image" :alt="trans('production.laser_title')" class="absolute inset-0 w-full h-full object-cover"/>
                    <div v-else class="absolute inset-0 bg-gradient-to-br from-[#0E7A8C]/30 to-[#1B3163]">
                        <div class="absolute inset-0 opacity-[0.06]" style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 22px 22px;"></div>
                        <div class="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            <div class="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                                <svg class="w-10 h-10 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
                                </svg>
                            </div>
                            <p class="text-white/80 font-semibold text-sm tracking-wide">{{ trans('production.laser_label') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════
             METİN 1 — Lazer kesim görüntüsünden sonra
        ═══════════════════════════════════════ -->
        <section class="bg-white py-20">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">{{ trans('production.section1_label') }}</p>
                <h2 class="text-3xl sm:text-4xl font-black text-[#1B3163] mb-6">{{ trans('production.section1_title') }}</h2>
                <p class="text-[#666] text-lg leading-relaxed">{{ trans('production.section1_text') }}</p>
            </div>
        </section>

        <!-- ═══════════════════════════════════════
             3'LÜ KART — Tasarım / İmalat / Son Ürün
        ═══════════════════════════════════════ -->
        <section class="bg-[#f4f5f6] py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-12 text-center">
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">{{ trans('production.cards_label') }}</p>
                    <h2 class="text-3xl sm:text-4xl font-black text-[#0e1e3d]">{{ trans('production.cards_title') }}</h2>
                </div>

                <div class="grid sm:grid-cols-3 gap-6">
                    <div v-for="card in productionCards" :key="card.key"
                        class="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#3DAFC4]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div class="relative aspect-[4/3]">
                            <img v-if="card.image" :src="card.image" :alt="trans(card.titleKey)" class="absolute inset-0 w-full h-full object-cover"/>
                            <div v-else class="absolute inset-0 bg-gradient-to-br from-[#1B3163]/5 to-[#0E7A8C]/10 flex items-center justify-center">
                                <div class="w-14 h-14 bg-[#0E7A8C]/10 group-hover:bg-[#0E7A8C] rounded-2xl flex items-center justify-center transition-colors duration-300">
                                    <svg class="w-7 h-7 text-[#0E7A8C] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="card.icon"/>
                                    </svg>
                                </div>
                            </div>
                            <span class="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#1B3163] text-white text-sm font-bold flex items-center justify-center">{{ card.key }}</span>
                        </div>
                        <div class="p-6">
                            <h3 class="text-lg font-black text-[#1B3163] mb-2">{{ trans(card.titleKey) }}</h3>
                            <p class="text-sm text-[#666] leading-relaxed">{{ trans(card.descKey) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════
             METİN 2 — Tasarım ve bitmiş ürünlerden sonra
        ═══════════════════════════════════════ -->
        <section class="bg-white py-20">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">{{ trans('production.section2_label') }}</p>
                <h2 class="text-3xl sm:text-4xl font-black text-[#1B3163] mb-6">{{ trans('production.section2_title') }}</h2>
                <p class="text-[#666] text-lg leading-relaxed">{{ trans('production.section2_text') }}</p>
            </div>
        </section>

        <!-- ═══════════════════════════════════════
             BÜKÜM — makine gif/görseli
        ═══════════════════════════════════════ -->
        <section class="bg-[#0e1e3d] py-20 overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-10">
                    <p class="text-xs font-semibold text-[#3DAFC4] uppercase tracking-widest mb-3">{{ trans('production.bend_label') }}</p>
                    <h2 class="text-3xl sm:text-4xl font-black text-white">{{ trans('production.bend_title') }}</h2>
                </div>

                <div class="relative w-full aspect-[16/8] rounded-2xl overflow-hidden border border-white/10">
                    <video v-if="bendMedia.video" class="absolute inset-0 w-full h-full object-cover" autoplay muted loop playsinline>
                        <source :src="bendMedia.video" type="video/mp4">
                    </video>
                    <img v-else-if="bendMedia.image" :src="bendMedia.image" :alt="trans('production.bend_title')" class="absolute inset-0 w-full h-full object-cover"/>
                    <div v-else class="absolute inset-0 bg-gradient-to-br from-[#1B3163] to-[#0E7A8C]/40">
                        <div class="absolute inset-0 opacity-[0.06]" style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 22px 22px;"></div>
                        <div class="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            <div class="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                                <svg class="w-10 h-10 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                                </svg>
                            </div>
                            <p class="text-white/80 font-semibold text-sm tracking-wide">{{ trans('production.bend_label') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════
             METİN 3 — Büküm görüntüsünden sonra
        ═══════════════════════════════════════ -->
        <section class="bg-[#f4f5f6] py-20">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">{{ trans('production.section3_label') }}</p>
                <h2 class="text-3xl sm:text-4xl font-black text-[#1B3163] mb-6">{{ trans('production.section3_title') }}</h2>
                <p class="text-[#666] text-lg leading-relaxed">{{ trans('production.section3_text') }}</p>
            </div>
        </section>

        <!-- ═══════════════════════════════════════
             SLIDER — 6-7 görsel
        ═══════════════════════════════════════ -->
        <section class="bg-white py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                        <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">{{ trans('production.gallery_label') }}</p>
                        <h2 class="text-3xl sm:text-4xl font-black text-[#0e1e3d]">{{ trans('production.gallery_title') }}</h2>
                    </div>
                    <div class="flex items-center gap-2">
                        <button @click="scrollGallery(-1)" aria-label="Previous"
                            class="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-[#1B3163] hover:bg-[#1B3163] hover:text-white hover:border-[#1B3163] transition-all duration-300">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                        </button>
                        <button @click="scrollGallery(1)" aria-label="Next"
                            class="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-[#1B3163] hover:bg-[#1B3163] hover:text-white hover:border-[#1B3163] transition-all duration-300">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                        </button>
                    </div>
                </div>

                <div ref="galleryTrack" class="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div v-for="(slide, i) in gallerySlides" :key="i"
                        class="snap-center flex-shrink-0 w-[85%] sm:w-[46%] lg:w-[31%] aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100 relative">
                        <img v-if="slide.image" :src="slide.image" :alt="`${trans('production.gallery_title')} ${i + 1}`" class="absolute inset-0 w-full h-full object-cover"/>
                        <div v-else class="absolute inset-0 bg-gradient-to-br from-[#f4f5f6] to-gray-100 flex items-center justify-center">
                            <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </AppLayout>
</template>
