<script setup>
import { ref, computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import { useLocale } from '@/composables/useLocale.js'
import AppLayout from '@/Layouts/AppLayout.vue'
import ProductSearch from '@/Components/ProductSearch.vue'

const { locale, trans, field } = useLocale()

const props = defineProps({
    category:        { type: Object, required: true },
    products:        { type: Object,  default: () => ({ data: [], links: [], total: 0 }) },
    subcategories:   { type: Array,  default: () => [] },
    sidebarChildren: { type: Array,  default: () => [] },
    categories:      { type: Array,  default: () => [] },
})

const localizedProducts = computed(() =>
    props.products.data.map(p => ({
        ...p,
        name: field(p, 'name') || p.name,
    }))
)

const localizedCategories = computed(() =>
    props.categories.map(c => ({ ...c, name: field(c, 'name') || c.name }))
)

const localizedSubcategories = computed(() =>
    props.subcategories.map(c => ({ ...c, name: field(c, 'name') || c.name, description: field(c, 'description') || c.description }))
)

const hasSubcategories = computed(() => props.subcategories.length > 0)

// Aktif ana kategori id'si (sidebar'da hangi kategorinin altı açık)
const activeParentId = computed(() => props.category.parent_id ?? props.category.id)

const localizedSidebarChildren = computed(() =>
    props.sidebarChildren.map(c => ({ ...c, name: field(c, 'name') || c.name }))
)

// Mobilde kategori/alt kategori listesi varsayılan kapalı, "Kategoriler" butonuyla açılır
const mobileFiltersOpen = ref(false)
</script>

<template>
    <AppLayout>
        <!-- Page Hero -->
        <section class="bg-gradient-to-br from-[#1B3163] to-[#1B3163] py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl sm:text-4xl font-black text-white">{{ trans('products.page_h1') }}</h1>
            </div>
        </section>

        <div class="py-12 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <!-- Mobil: arama + kategori filtre butonu -->
                <div class="flex lg:hidden items-center gap-3 mb-6">
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

                <div class="flex flex-col lg:flex-row gap-8">
                    <!-- Sidebar -->
                    <aside :class="mobileFiltersOpen ? 'block' : 'hidden'" class="lg:block lg:w-64 flex-shrink-0">
                        <div class="bg-white rounded-2xl shadow-sm overflow-hidden lg:sticky lg:top-28">
                            <div class="bg-[#1B3163] px-5 py-4">
                                <h3 class="font-bold text-white text-sm tracking-widest uppercase">{{ trans('products.categories') }}</h3>
                            </div>
                            <nav class="p-2">
                                <template v-for="cat in localizedCategories" :key="cat.id">
                                    <!-- Ana kategori satırı -->
                                    <Link
                                        :href="`/urunler/${cat.slug}`"
                                        :class="[
                                            'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                                            cat.id === activeParentId
                                                ? 'bg-[#1B3163] text-white'
                                                : 'text-[#1B3163] hover:bg-gray-50 hover:text-[#0E7A8C]'
                                        ]"
                                    >
                                        <span>{{ cat.name }}</span>
                                        <!-- Ok: alt kategori varsa aşağı, yoksa sağa -->
                                        <svg
                                            class="w-4 h-4 opacity-60 transition-transform duration-200"
                                            :class="cat.id === activeParentId && localizedSidebarChildren.length ? 'rotate-90' : ''"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                        </svg>
                                    </Link>

                                    <!-- Alt kategoriler (sadece aktif ana kategorinin altında) -->
                                    <div v-if="cat.id === activeParentId && localizedSidebarChildren.length" class="ml-3 mb-1">
                                        <Link
                                            v-for="sub in localizedSidebarChildren"
                                            :key="sub.id"
                                            :href="`/urunler/${sub.slug}`"
                                            :class="[
                                                'flex items-center justify-between gap-2 pl-4 pr-3 py-2 rounded-lg text-sm transition-colors',
                                                sub.id === category.id
                                                    ? 'bg-[#0E7A8C] text-white font-semibold'
                                                    : 'text-[#555] hover:bg-gray-50 hover:text-[#0E7A8C]'
                                            ]"
                                        >
                                            <span>{{ sub.name }}</span>
                                            <svg v-if="sub.id === category.id" class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                                        </Link>
                                    </div>
                                </template>
                            </nav>
                        </div>
                    </aside>

                    <!-- Ana içerik -->
                    <div class="flex-1">

                        <!-- ALT KATEGORİLER GÖRÜNÜMÜ -->
                        <div v-if="hasSubcategories" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            <Link
                                v-for="sub in localizedSubcategories"
                                :key="sub.id"
                                :href="`/urunler/${sub.slug}`"
                                class="group cursor-pointer block"
                            >
                                <div class="relative bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl"
                                     style="border:2px solid #1B3163;box-shadow:4px 4px 0 #1B3163;">
                                    <div class="flex items-center justify-center py-3 px-4" style="background:#1B3163">
                                        <h3 class="text-white font-bold text-sm tracking-wide uppercase text-center">{{ sub.name }}</h3>
                                    </div>
                                    <div class="p-5 flex items-center justify-between">
                                        <p class="text-sm text-gray-500 flex-1 mr-3">{{ sub.description }}</p>
                                        <div class="flex flex-col items-end gap-1 flex-shrink-0">
                                            <span class="text-xs font-bold text-[#1B3163]">{{ sub.products_count }} {{ trans('common.product_unit') }}</span>
                                            <span class="text-xs font-bold text-[#0E7A8C] flex items-center gap-1 group-hover:gap-2 transition-all">
                                                {{ trans('common.explore') }}
                                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <!-- ÜRÜNLER GÖRÜNÜMÜ -->
                        <template v-else>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                            <p class="text-[#666] text-sm">
                                <span class="font-bold text-[#1B3163]">{{ products.total ?? localizedProducts.length }}</span> {{ trans('products.product_count') }}
                            </p>
                            <div class="hidden lg:block w-72">
                                <ProductSearch />
                            </div>
                        </div>

                        <div v-if="localizedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            <Link
                                v-for="product in localizedProducts"
                                :key="product.id"
                                :href="`/urunler/${category.slug}/${product.slug}`"
                                class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <!-- Product Image -->
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
                                <!-- Content -->
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
                        <div v-else class="text-center py-20">
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
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
