<script setup>
import { ref, computed } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import { useLocale } from '@/composables/useLocale.js'
import AppLayout from '@/Layouts/AppLayout.vue'

const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    category: {
        type: Object,
        required: true
    },
    relatedProducts: {
        type: Array,
        default: () => []
    }
})

const { locale, trans, field } = useLocale()
const st = computed(() => usePage().props.siteSettings || {})
const phone1Tel = computed(() => st.value.phone1 ? st.value.phone1.replace(/\s/g, '') : '+903462250000')
const whatsappLink = computed(() => `https://wa.me/${st.value.whatsapp || '905356600060'}`)
const activeImage = ref(0)
const images = props.product.image_urls && props.product.image_urls.length > 0 ? props.product.image_urls : []

const imgUrl = (path) => path || ''

const localizedProduct = computed(() => ({
    ...props.product,
    name:        field(props.product, 'name')        || props.product.name,
    description: field(props.product, 'description') || props.product.description,
}))

const localizedCategory = computed(() => props.category ? {
    ...props.category,
    name: field(props.category, 'name') || props.category.name,
} : null)

const localizedRelated = computed(() =>
    props.relatedProducts.map(p => ({ ...p, name: field(p, 'name') || p.name }))
)
</script>

<template>
    <AppLayout hide-floating-cta>
        <!-- ═══════════════════════════════════════
             ÜST ÇUBUK — geri dönüş linki (kategoriye)
        ═══════════════════════════════════════ -->
        <section class="bg-white py-6 border-b border-gray-100">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link :href="`/urunler/${category.slug}`" class="flex items-center gap-1.5 w-fit text-[#666] hover:text-[#0E7A8C] text-sm font-semibold transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                    {{ trans('common.back') }}
                </Link>
            </div>
        </section>

        <!-- Product Detail -->
        <section class="py-12 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-12">
                    <!-- Images -->
                    <div>
                        <!-- Main Image -->
                        <div class="relative bg-white rounded-2xl overflow-hidden aspect-square mb-4 border border-gray-100">
                            <img
                                v-if="images.length > 0"
                                :src="imgUrl(images[activeImage])"
                                :alt="product.name"
                                class="w-full h-full object-contain p-4"
                            />
                            <div v-else class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                <svg class="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                                </svg>
                                <p class="text-gray-500 text-sm mt-3">{{ trans('products.no_image') }}</p>
                            </div>
                            <div v-if="product.featured" class="absolute top-4 left-4">
                                <span class="bg-[#0E7A8C] text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">{{ trans('products.featured_product') }}</span>
                            </div>
                        </div>
                        <!-- Thumbnails -->
                        <div v-if="images.length > 1" class="flex gap-3 flex-wrap">
                            <button
                                v-for="(img, idx) in images"
                                :key="idx"
                                @click="activeImage = idx"
                                :class="[
                                    'w-20 h-20 rounded-xl overflow-hidden border-2 transition-all',
                                    activeImage === idx ? 'border-[#0E7A8C] shadow-md' : 'border-gray-200 hover:border-[#0E7A8C]/50'
                                ]"
                            >
                                <img :src="imgUrl(img)" :alt="`${product.name} - ${idx + 1}`" loading="lazy" class="w-full h-full object-contain p-1" />
                            </button>
                        </div>
                    </div>

                    <!-- Info -->
                    <div>
                        <div class="flex items-center gap-3 mb-4">
                            <Link
                                :href="`/urunler/${category.slug}`"
                                class="inline-flex items-center text-xs sm:text-sm font-bold text-white bg-[#0E7A8C] hover:bg-[#0B6575] px-4 py-2 rounded-full shadow-sm transition-colors"
                            >
                                {{ localizedCategory.name }}
                            </Link>
                        </div>
                        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B3163] mb-6 leading-tight">{{ localizedProduct.name }}</h1>
                        <div v-if="localizedProduct.description" class="prose prose-gray max-w-none mb-8">
                            <p class="text-[#666] leading-relaxed text-base whitespace-pre-line">{{ localizedProduct.description }}</p>
                        </div>

                        <!-- Actions -->
                        <div class="bg-gray-50 rounded-2xl p-6 space-y-4">
                            <h3 class="font-bold text-[#1B3163] text-lg">{{ trans('products.quote_h') }}</h3>
                            <p class="text-[#666] text-sm">{{ trans('products.price_info') }}</p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <a
                                    :href="`tel:${phone1Tel}`"
                                    class="flex items-center justify-center gap-2 bg-[#1B3163] hover:bg-[#0E7A8C] text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                    </svg>
                                    {{ trans('products.call') }}
                                </a>
                                <Link
                                    href="/iletisim"
                                    class="flex items-center justify-center gap-2 bg-[#0E7A8C] hover:bg-[#0B6575] text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                    {{ trans('products.send_msg') }}
                                </Link>
                            </div>
                            <a
                                :href="whatsappLink"
                                target="_blank"
                                class="hidden lg:flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm w-full"
                            >
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                {{ trans('products.whatsapp') }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Related Products -->
        <section v-if="localizedRelated.length > 0" class="py-14 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-2xl sm:text-3xl font-black text-[#1B3163] mb-8">{{ trans('products.related') }}</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link
                        v-for="related in localizedRelated"
                        :key="related.id"
                        :href="`/urunler/${category.slug}/${related.slug}`"
                        class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                        <div class="relative h-44 bg-white border-b border-gray-100 overflow-hidden">
                            <img
                                v-if="related.image_urls && related.image_urls[0]"
                                :src="related.image_urls[0]"
                                :alt="related.name"
                                class="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                            />
                            <div v-else class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                                </svg>
                            </div>
                        </div>
                        <div class="p-4">
                            <h3 class="font-bold text-[#1B3163] text-sm group-hover:text-[#0E7A8C] transition-colors">{{ related.name }}</h3>
                        </div>
                    </Link>
                </div>
            </div>
        </section>

        <!-- Mobilde sabit alt çubuğun içeriği kapatmaması için boşluk -->
        <div class="h-24 lg:hidden"></div>

        <!-- ═══════════════════════════════════════
             MOBİL — ekranın altına sabit Ara / WhatsApp çubuğu
        ═══════════════════════════════════════ -->
        <div
            class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex gap-3"
            style="padding-bottom: max(0.75rem, env(safe-area-inset-bottom));"
        >
            <a
                :href="`tel:${phone1Tel}`"
                class="flex-1 flex items-center justify-center gap-2 bg-[#1B3163] active:bg-[#0E7A8C] text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {{ trans('products.call') }}
            </a>
            <a
                :href="whatsappLink"
                target="_blank"
                class="flex-1 flex items-center justify-center gap-2 bg-green-500 active:bg-green-600 text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
            </a>
        </div>
    </AppLayout>
</template>
