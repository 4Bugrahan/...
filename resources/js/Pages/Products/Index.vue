<script setup>
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import { useLocale } from '@/composables/useLocale.js'
import AppLayout from '@/Layouts/AppLayout.vue'

const props = defineProps({
    categories:  { type: Array,  default: () => [] },
    pageContent: { type: Object, default: () => ({}) },
})

const c = (key, fallback = '') => props.pageContent[key] || fallback

const defaultCategories = [
    { id: 1, name: 'Pişiriciler',             slug: 'pisiriciler',             description: 'Endüstriyel ocaklar, ızgaralar ve fritözler.' },
    { id: 2, name: 'Fırınlar',                slug: 'firinlar',                description: 'Konveksiyonlu, kombi ve pizza fırınları.' },
    { id: 3, name: 'Bulaşıkhane Ekipmanları', slug: 'bulasikhane-ekipmanlari', description: 'Endüstriyel bulaşık makineleri.' },
    { id: 4, name: 'Buzdolapları',            slug: 'buzdolaplari',            description: 'Tezgah altı ve dik tip buzdolapları.' },
    { id: 5, name: 'Hazırlık Ekipmanları',    slug: 'hazirlik-ekipmanlari',    description: 'Sebze yıkama ve hazırlık üniteleri.' },
    { id: 6, name: 'Nötr Ekipmanlar',         slug: 'notr-ekipmanlar',         description: 'Tezgahlar, raflar ve evyeler.' },
]

const { locale, trans, field } = useLocale()

const displayCategories = computed(() =>
    (props.categories.length > 0 ? props.categories : defaultCategories).map(cat => ({
        ...cat,
        name:        field(cat, 'name')        || cat.name,
        description: field(cat, 'description') || cat.description,
    }))
)

// Kategori kapak görseli — çerçeve sabit, ürün fotoğrafı (arka planı kaldırılmış) ayrı katman
const FRAME_IMAGE = '/images/category-frame.jpeg?v=2'
const getCoverImage = (slug) => `/images/categories-transparent/${slug}.png?v=2`
</script>

<template>
    <AppLayout>

        <!-- Page Header Banner -->
        <section class="flex items-center" style="background:#1B3163;min-height:160px">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
                <h1 class="text-3xl sm:text-4xl font-black text-white mb-3">{{ c('prod_page_title', 'ÜRÜNLER') }}</h1>
            </div>
        </section>

        <!-- Categories Grid -->
        <section style="background:#f0f2f5;padding:60px 0">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div class="mb-10">
                    <p class="text-sm" style="color:#666">
                        {{ c('prod_subtitle', 'Endüstriyel mutfak ekipmanlarını kategorilere göre inceleyin.') }}
                    </p>
                </div>

                <!-- Modern category cards -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <Link
                        v-for="category in displayCategories"
                        :key="category.id"
                        :href="`/urunler/${category.slug}`"
                        class="group cursor-pointer block rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(27,49,99,0.25)]"
                        style="border: 1px solid #ececec; outline: none; -webkit-tap-highlight-color: transparent;"
                    >
                        <!-- Kapak görseli: sabit çerçeve + üzerinde büyüyen ürün görseli -->
                        <div class="relative overflow-hidden aspect-square">
                            <img :src="FRAME_IMAGE" alt="" draggable="false"
                                 class="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />
                            <img :src="getCoverImage(category.slug)" :alt="category.name" draggable="false"
                                 @error="$event.target.style.display = 'none'"
                                 class="absolute inset-[7%] w-[86%] h-[86%] object-contain outline-none transition-transform duration-500 group-hover:scale-105" />
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

    </AppLayout>
</template>
