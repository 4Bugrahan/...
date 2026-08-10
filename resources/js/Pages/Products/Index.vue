<script setup>
import { ref, computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import { useLocale } from '@/composables/useLocale.js'
import AppLayout from '@/Layouts/AppLayout.vue'
import ProductSearch from '@/Components/ProductSearch.vue'

const props = defineProps({
    categories:   { type: Array,  default: () => [] },
    products:     { type: Object, default: () => ({ data: [], links: [], total: 0 }) },
    categoryTree: { type: Array,  default: () => [] },
    pageContent:  { type: Object, default: () => ({}) },
})

const c = (key, fallback = '') => props.pageContent[key] || fallback

const { trans, field } = useLocale()

const defaultCategories = [
    { id: 1, name: 'Pişiriciler',             slug: 'pisiriciler',             description: 'Endüstriyel ocaklar, ızgaralar ve fritözler.' },
    { id: 2, name: 'Fırınlar',                slug: 'firinlar',                description: 'Konveksiyonlu, kombi ve pizza fırınları.' },
    { id: 3, name: 'Bulaşıkhane Ekipmanları', slug: 'bulasikhane-ekipmanlari', description: 'Endüstriyel bulaşık makineleri.' },
    { id: 4, name: 'Buzdolapları',            slug: 'buzdolaplari',            description: 'Tezgah altı ve dik tip buzdolapları.' },
    { id: 5, name: 'Hazırlık Ekipmanları',    slug: 'hazirlik-ekipmanlari',    description: 'Sebze yıkama ve hazırlık üniteleri.' },
    { id: 6, name: 'Nötr Ekipmanlar',         slug: 'notr-ekipmanlar',         description: 'Tezgahlar, raflar ve evyeler.' },
]

// Masaüstü — kategori kartları
const displayCategories = computed(() =>
    (props.categories.length > 0 ? props.categories : defaultCategories).map(cat => ({
        ...cat,
        name:        field(cat, 'name')        || cat.name,
        description: field(cat, 'description') || cat.description,
    }))
)

const getCoverImage = (slug) => `/images/categories-transparent/${slug}.png?v=2`

// Mobil — düz ürün listesi
const localizedProducts = computed(() =>
    props.products.data.map(p => ({
        ...p,
        name: field(p, 'name') || p.name,
    }))
)

const localizedTree = computed(() =>
    props.categoryTree.map(cat => ({
        ...cat,
        name: field(cat, 'name') || cat.name,
        children: (cat.children || []).map(sub => ({
            ...sub,
            name: field(sub, 'name') || sub.name,
        })),
    }))
)

const mobileFiltersOpen = ref(false)
const expandedId = ref(null)
function toggleExpand(id) {
    expandedId.value = expandedId.value === id ? null : id
}
</script>

<template>
    <AppLayout>

        <!-- Page Header Banner -->
        <section class="flex items-center" style="background:#1B3163;min-height:160px">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
                <h1 class="text-3xl sm:text-4xl font-black text-white mb-3">{{ c('prod_page_title', 'ÜRÜNLER') }}</h1>
            </div>
        </section>

        <!-- ═══════════════════════════════════════
             MASAÜSTÜ — kategori kartları
        ═══════════════════════════════════════ -->
        <section class="hidden lg:block" style="background:#f0f2f5;padding:60px 0">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
                    <p class="text-sm" style="color:#666">
                        {{ c('prod_subtitle', 'Endüstriyel mutfak ekipmanlarını kategorilere göre inceleyin.') }}
                    </p>
                    <div class="w-full sm:w-80 flex-shrink-0">
                        <ProductSearch />
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <Link
                        v-for="category in displayCategories"
                        :key="category.id"
                        :href="`/urunler/${category.slug}`"
                        class="group cursor-pointer block rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(27,49,99,0.25)]"
                        style="border: 1px solid #ececec; outline: none; -webkit-tap-highlight-color: transparent;"
                    >
                        <!-- Kapak görseli -->
                        <div class="relative overflow-hidden aspect-square">
                            <img :src="getCoverImage(category.slug)" :alt="category.name" draggable="false"
                                 @error="$event.target.style.display = 'none'"
                                 class="absolute inset-[5%] w-[90%] h-[90%] object-contain outline-none transition-transform duration-500 group-hover:scale-105" />
                        </div>

                        <!-- İçerik -->
                        <div class="px-4 py-3" style="border-top:1px solid #f0f1f3">
                            <h3 class="font-bold text-sm leading-snug truncate" style="color:#1B3163">{{ category.name }}</h3>
                            <span class="text-xs font-medium" style="color:#8b93a3">
                                {{ category.total_products_count ?? category.products_count ?? 0 }} {{ trans('common.product_unit') }}
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </section>

        <!-- ═══════════════════════════════════════
             MOBİL — doğrudan ürün listesi + arama + kategori filtresi
        ═══════════════════════════════════════ -->
        <section class="lg:hidden" style="background:#f0f2f5;padding:60px 0">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div class="mb-8">
                    <p class="text-sm" style="color:#666">
                        {{ c('prod_subtitle', 'Endüstriyel mutfak ekipmanlarını kategorilere göre inceleyin.') }}
                    </p>
                </div>

                <div class="flex items-center gap-3 mb-6">
                    <div class="flex-1">
                        <ProductSearch />
                    </div>
                    <button
                        type="button"
                        @click="mobileFiltersOpen = !mobileFiltersOpen"
                        class="flex items-center gap-2 bg-[#0E7A8C] hover:bg-[#0B6575] text-white text-sm font-bold px-4 py-2.5 rounded-full transition-colors flex-shrink-0"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h18M6 12h12M10 20h4"/>
                        </svg>
                        {{ trans('products.categories') }}
                    </button>
                </div>

                <!-- Kategori filtre paneli -->
                <div v-show="mobileFiltersOpen" class="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
                    <div class="bg-[#1B3163] px-5 py-4">
                        <h3 class="font-bold text-white text-sm tracking-widest uppercase">{{ trans('products.categories') }}</h3>
                    </div>
                    <nav class="p-2">
                        <template v-for="cat in localizedTree" :key="cat.id">
                            <Link
                                v-if="!cat.children.length"
                                :href="`/urunler/${cat.slug}`"
                                class="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-[#1B3163] hover:bg-gray-50 hover:text-[#0E7A8C] transition-colors"
                            >
                                <span>{{ cat.name }}</span>
                            </Link>
                            <button
                                v-else
                                type="button"
                                @click="toggleExpand(cat.id)"
                                class="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-[#1B3163] hover:bg-gray-50 hover:text-[#0E7A8C] transition-colors"
                            >
                                <span>{{ cat.name }}</span>
                                <svg class="w-4 h-4 opacity-60 transition-transform duration-200" :class="expandedId === cat.id ? 'rotate-90' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>

                            <div v-if="cat.children.length && expandedId === cat.id" class="ml-3 mb-1">
                                <Link
                                    v-for="sub in cat.children"
                                    :key="sub.id"
                                    :href="`/urunler/${sub.slug}`"
                                    class="flex items-center gap-2 pl-4 pr-3 py-2 rounded-lg text-sm text-[#555] hover:bg-gray-50 hover:text-[#0E7A8C] transition-colors"
                                >
                                    {{ sub.name }}
                                </Link>
                            </div>
                        </template>
                    </nav>
                </div>

                <p class="text-[#666] text-sm mb-6">
                    <span class="font-bold text-[#1B3163]">{{ products.total ?? localizedProducts.length }}</span> {{ trans('products.product_count') }}
                </p>

                <div v-if="localizedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Link
                        v-for="product in localizedProducts"
                        :key="product.id"
                        :href="`/urunler/${product.category_slug}/${product.slug}`"
                        class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                        <div class="relative h-52 overflow-hidden bg-white border-b border-gray-100">
                            <img
                                v-if="product.image_urls && product.image_urls[0]"
                                :src="product.image_urls[0]"
                                :alt="product.name"
                                class="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                            />
                            <div v-else class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                                </svg>
                            </div>
                            <div v-if="product.featured" class="absolute top-3 left-3">
                                <span class="bg-[#0E7A8C] text-white text-xs font-bold px-3 py-1 rounded-full">{{ trans('products.featured_badge') }}</span>
                            </div>
                        </div>
                        <div class="p-5">
                            <h3 class="font-bold text-[#1B3163] text-base mb-2 group-hover:text-[#0E7A8C] transition-colors leading-snug">
                                {{ product.name }}
                            </h3>
                            <div class="flex items-center gap-2 text-[#0E7A8C] text-sm font-semibold">
                                <span>{{ trans('products.view_details') }}</span>
                                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                </svg>
                            </div>
                        </div>
                    </Link>
                </div>

                <!-- Sayfalama -->
                <div v-if="products.links && products.links.length > 3" class="flex flex-wrap gap-1.5 mt-10 justify-center">
                    <Link v-for="(link, i) in products.links" :key="i" :href="link.url || ''"
                        v-html="link.label"
                        preserve-scroll
                        class="px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors"
                        :class="link.active ? 'bg-[#1B3163] text-white' : link.url ? 'bg-white text-[#1B3163] border border-gray-200 hover:border-[#0E7A8C]/50 hover:text-[#0E7A8C]' : 'text-gray-300 cursor-default pointer-events-none'" />
                </div>

                <!-- Empty State -->
                <div v-else-if="localizedProducts.length === 0" class="text-center py-20">
                    <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
                        <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                        </svg>
                    </div>
                    <h3 class="text-[#1B3163] font-bold text-xl mb-2">{{ trans('products.no_product_h') }}</h3>
                    <p class="text-[#666] mb-6">{{ trans('products.no_product_p') }}</p>
                    <Link href="/iletisim" class="inline-flex items-center gap-2 bg-[#0E7A8C] text-white font-bold px-6 py-3 rounded-lg transition-colors hover:bg-[#0B6575]">
                        {{ trans('common.contact_us') }}
                    </Link>
                </div>
            </div>
        </section>

    </AppLayout>
</template>
