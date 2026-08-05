<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { Link } from '@inertiajs/vue3'
import { useLocale } from '@/composables/useLocale.js'

const { trans } = useLocale()

const query = ref('')
const results = ref([])
const loading = ref(false)
const open = ref(false)
const searched = ref(false)

let debounceTimer = null
let currentController = null

function onInput() {
    open.value = true
    clearTimeout(debounceTimer)

    const q = query.value.trim()

    if (q.length < 2) {
        results.value = []
        searched.value = false
        loading.value = false
        return
    }

    debounceTimer = setTimeout(() => runSearch(q), 300)
}

async function runSearch(q) {
    loading.value = true
    currentController?.abort()
    currentController = new AbortController()

    try {
        const res = await fetch(`/urun-ara?q=${encodeURIComponent(q)}`, {
            signal: currentController.signal,
            headers: { Accept: 'application/json' },
        })
        results.value = res.ok ? await res.json() : []
    } catch (e) {
        if (e.name !== 'AbortError') results.value = []
    } finally {
        loading.value = false
        searched.value = true
    }
}

function closeSoon() {
    // Link tıklamasının çalışabilmesi için blur'da hemen kapatmıyoruz
    setTimeout(() => { open.value = false }, 150)
}

function reset() {
    query.value = ''
    results.value = []
    searched.value = false
    open.value = false
}

onBeforeUnmount(() => clearTimeout(debounceTimer))
</script>

<template>
    <div class="relative w-full">
        <div class="relative">
            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/>
            </svg>
            <input
                v-model="query"
                type="text"
                :placeholder="trans('products.search_placeholder')"
                @input="onInput"
                @focus="open = true"
                @blur="closeSoon"
                class="w-full border border-gray-200 rounded-lg pl-10 pr-9 py-2.5 text-sm text-[#1B3163] bg-white focus:outline-none focus:ring-2 focus:ring-[#3DAFC4] focus:border-transparent transition-shadow"
            />
            <button v-if="query" @mousedown.prevent="reset" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B3163]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>

        <!-- Dropdown -->
        <div v-if="open && query.trim().length > 0"
            class="absolute z-30 top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-h-96 overflow-y-auto">

            <div v-if="query.trim().length < 2" class="px-4 py-4 text-sm text-gray-400 text-center">
                {{ trans('products.search_hint') }}
            </div>

            <div v-else-if="loading" class="px-4 py-4 text-sm text-gray-400 text-center">
                <svg class="w-4 h-4 animate-spin inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V2.5"/>
                </svg>
            </div>

            <div v-else-if="results.length === 0 && searched" class="px-4 py-4 text-sm text-gray-400 text-center">
                {{ trans('products.search_no_results') }}
            </div>

            <Link v-else v-for="product in results" :key="product.id"
                :href="`/urunler/${product.category_slug}/${product.slug}`"
                class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
            >
                <div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img v-if="product.image" :src="product.image" :alt="product.name" class="w-full h-full object-contain" />
                    <svg v-else class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                </div>
                <span class="text-sm font-medium text-[#1B3163] leading-snug">{{ product.name }}</span>
            </Link>
        </div>
    </div>
</template>
