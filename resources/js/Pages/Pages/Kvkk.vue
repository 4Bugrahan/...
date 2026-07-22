<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale.js'
import AppLayout from '@/Layouts/AppLayout.vue'

const { trans } = useLocale()

const props = defineProps({
    pageContent: { type: Object, default: () => ({}) }
})

const c = (key, fallback = '') => props.pageContent[key] || fallback

const sections = computed(() => [
    {
        id: 1,
        title: trans('kvkk.s1_title'),
        content: trans('kvkk.s1_content'),
    },
    {
        id: 2,
        title: trans('kvkk.s2_title'),
        content: null,
        list: trans('kvkk.s2_list'),
        footer: trans('kvkk.s2_footer'),
    },
    {
        id: 3,
        title: trans('kvkk.s3_title'),
        content: trans('kvkk.s3_content'),
        list: trans('kvkk.s3_list'),
    },
    {
        id: 4,
        title: trans('kvkk.s4_title'),
        content: trans('kvkk.s4_content'),
        list: trans('kvkk.s4_list'),
    },
    {
        id: 5,
        title: trans('kvkk.s5_title'),
        content: trans('kvkk.s5_content'),
        list: trans('kvkk.s5_list'),
    },
    {
        id: 6,
        title: trans('kvkk.s6_title'),
        content: trans('kvkk.s6_content'),
        list: trans('kvkk.s6_list'),
    },
    {
        id: 7,
        title: trans('kvkk.s7_title'),
        content: trans('kvkk.s7_content'),
    },
    {
        id: 8,
        title: trans('kvkk.s8_title'),
        content: trans('kvkk.s8_content'),
    },
    {
        id: 9,
        title: trans('kvkk.s9_title'),
        content: trans('kvkk.s9_content'),
        list: trans('kvkk.s9_list'),
        footer: trans('kvkk.s9_footer'),
    },
    {
        id: 10,
        title: trans('kvkk.s10_title'),
        content: trans('kvkk.s10_content'),
    },
])
</script>

<template>
    <AppLayout>
        <!-- Hero -->
        <section class="bg-gradient-to-br from-[#1B3163] to-[#1B3163] py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-3xl">
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                        {{ c('kvkk_hero_title', 'KVKK ve Gizlilik Politikası') }}
                    </h1>
                    <p class="text-white/70 text-lg leading-relaxed">
                        {{ c('kvkk_hero_desc', '4B Grup Endüstriyel Ticaret olarak kişisel verilerin güvenliği ve gizliliği kurumsal önceliktir. Bu belge, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında hazırlanmıştır.') }}
                    </p>
                    <p class="text-white/40 text-sm mt-4 flex items-center gap-2">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        {{ c('kvkk_updated_at', 'Son güncelleme: Ocak 2025') }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Content -->
        <section class="bg-white py-16">
            <div class="max-w-4xl mx-auto px-6">

                <div class="space-y-10">
                    <div v-for="section in sections" :key="section.id"
                        class="border-b border-gray-100 pb-10 last:border-b-0">
                        <!-- Section header -->
                        <div class="flex items-start gap-4 mb-5">
                            <div class="w-9 h-9 rounded-lg bg-[#1B3163] text-white flex items-center justify-center text-sm font-extrabold flex-shrink-0 mt-0.5">
                                {{ section.id }}
                            </div>
                            <h2 class="text-xl font-extrabold text-[#0e1e3d]">{{ section.title }}</h2>
                        </div>

                        <div class="pl-13" style="padding-left: 52px;">
                            <!-- Main text -->
                            <p v-if="section.content" class="text-gray-600 leading-relaxed text-[15px] mb-4">
                                {{ section.content }}
                            </p>

                            <!-- List -->
                            <ul v-if="section.list" class="space-y-2.5 mb-4">
                                <li v-for="item in section.list" :key="item"
                                    class="flex items-start gap-3 text-gray-600 text-[15px]">
                                    <span class="w-1.5 h-1.5 rounded-full bg-[#3DAFC4] flex-shrink-0 mt-2"></span>
                                    <span class="leading-relaxed">{{ item }}</span>
                                </li>
                            </ul>

                            <!-- Footer note -->
                            <p v-if="section.footer" class="text-gray-500 text-sm leading-relaxed bg-[#f4f5f6] rounded-xl p-4">
                                {{ section.footer }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Contact box -->
                <div class="mt-14 bg-[#0e1e3d] rounded-2xl p-8 text-white">
                    <h3 class="text-xl font-extrabold mb-2">{{ trans('kvkk.contact_title') }}</h3>
                    <p class="text-white/50 text-sm mb-6 leading-relaxed">
                        {{ trans('kvkk.contact_desc') }}
                    </p>
                    <div class="grid sm:grid-cols-3 gap-4">
                        <a href="tel:+903462250000"
                            class="flex items-center gap-3 bg-white/8 border border-white/10 rounded-xl p-4 hover:bg-white/15 hover:border-[#3DAFC4]/40 transition-all">
                            <div class="w-9 h-9 rounded-lg bg-[#3DAFC4]/20 flex items-center justify-center flex-shrink-0">
                                <svg class="w-4 h-4 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                            </div>
                            <div>
                                <p class="text-white/40 text-[10px] font-semibold uppercase tracking-wider">{{ trans('kvkk.label_phone') }}</p>
                                <p class="text-white text-sm font-semibold">+90 346 225 00 00</p>
                            </div>
                        </a>
                        <a href="mailto:info@4bgrup.com"
                            class="flex items-center gap-3 bg-white/8 border border-white/10 rounded-xl p-4 hover:bg-white/15 hover:border-[#3DAFC4]/40 transition-all">
                            <div class="w-9 h-9 rounded-lg bg-[#3DAFC4]/20 flex items-center justify-center flex-shrink-0">
                                <svg class="w-4 h-4 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            </div>
                            <div>
                                <p class="text-white/40 text-[10px] font-semibold uppercase tracking-wider">{{ trans('kvkk.label_email') }}</p>
                                <p class="text-white text-sm font-semibold">info@4bgrup.com</p>
                            </div>
                        </a>
                        <div class="flex items-center gap-3 bg-white/8 border border-white/10 rounded-xl p-4">
                            <div class="w-9 h-9 rounded-lg bg-[#3DAFC4]/20 flex items-center justify-center flex-shrink-0">
                                <svg class="w-4 h-4 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            </div>
                            <div>
                                <p class="text-white/40 text-[10px] font-semibold uppercase tracking-wider">{{ trans('kvkk.label_address') }}</p>
                                <p class="text-white text-sm font-semibold">{{ trans('kvkk.address_value') }}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </AppLayout>
</template>
