<script setup>
import { useForm, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale.js'
import AppLayout from '@/Layouts/AppLayout.vue'

const { trans } = useLocale()

const props = defineProps({
    flash: { type: Object, default: () => ({}) }
})

const page = usePage()
const st = computed(() => page.props.siteSettings || {})

// WhatsApp numarasını görüntüleme için formatla
const whatsappDisplay = computed(() => {
    if (st.value.phone2) return st.value.phone2
    const w = st.value.whatsapp || '905356600060'
    return '+' + w.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
})

const form = useForm({
    name: '',
    email: '',
    phone: '',
    message: '',
    website_url: '', // honeypot
})

function submit() {
    form.post('/iletisim', {
        onSuccess: () => form.reset()
    })
}
</script>

<template>
    <AppLayout>

        <!-- Hero -->
        <section class="relative overflow-hidden bg-[#1B3163]" style="min-height:240px">

            <div class="relative max-w-7xl mx-auto px-6 py-16">
                <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
                    <div>
                        <h1 class="text-4xl sm:text-5xl font-black text-white leading-tight">{{ trans('contact.reach_h') }}</h1>
                    </div>

                    <!-- Response badge -->
                    <div class="flex items-center gap-3 rounded-2xl px-5 py-3.5 border border-white/10 bg-white/[0.04] w-fit">
                        <div class="w-9 h-9 rounded-xl bg-[#3DAFC4]/20 flex items-center justify-center flex-shrink-0">
                            <svg class="w-4 h-4 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <div>
                            <p class="text-white/35 text-[10px] font-bold uppercase tracking-wider leading-none mb-1">{{ trans('contact.response_label') }}</p>
                            <p class="text-white text-sm font-bold">{{ trans('contact.response_time') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Main Content -->
        <section class="bg-[#f0f2f5] py-16">
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                    <!-- LEFT: dark info panel -->
                    <div class="lg:col-span-2">
                        <div class="rounded-2xl overflow-hidden shadow-2xl shadow-[#0e1e3d]/20" style="background:#0e1e3d;">

                            <!-- Header -->
                            <div class="px-7 pt-7 pb-5" style="border-bottom:1px solid rgba(255,255,255,0.06)">
                                <p class="text-[#3DAFC4] text-[10px] font-bold uppercase tracking-[4px] mb-1.5">{{ trans('contact.info_title') }}</p>
                                <h2 class="text-lg font-black text-white">{{ trans('contact.channels') }}</h2>
                            </div>

                            <!-- Items -->
                            <div class="px-4 py-5 space-y-1">

                                <!-- Telefon -->
                                <a :href="`tel:${st.phone1?.replace(/\\s/g,'')}`"
                                    class="flex items-center gap-4 rounded-xl px-4 py-4 transition-colors duration-200 hover:bg-white/[0.04]"
                                >
                                    <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors" style="background:rgba(61,175,196,0.12)">
                                        <svg class="w-4 h-4 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-white/35 text-[10px] font-bold uppercase tracking-wider mb-1">{{ trans('contact.phone') }}</p>
                                        <p class="text-white font-semibold text-sm">{{ st.phone1 }}</p>
                                    </div>
                                    <svg class="w-4 h-4 text-white/15 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                                </a>

                                <!-- WhatsApp -->
                                <a :href="`https://wa.me/${st.whatsapp}`" target="_blank"
                                    class="flex items-center gap-4 rounded-xl px-4 py-4 transition-colors duration-200 hover:bg-white/[0.04]"
                                >
                                    <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background:rgba(34,197,94,0.12)">
                                        <svg class="w-4 h-4" style="color:#4ade80" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-white/35 text-[10px] font-bold uppercase tracking-wider mb-1">WhatsApp</p>
                                        <p class="text-white font-semibold text-sm">{{ whatsappDisplay }}</p>
                                    </div>
                                    <svg class="w-4 h-4 text-white/15 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                                </a>

                                <!-- E-posta -->
                                <a :href="`mailto:${st.email}`"
                                    class="flex items-center gap-4 rounded-xl px-4 py-4 transition-colors duration-200 hover:bg-white/[0.04]"
                                >
                                    <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background:rgba(61,175,196,0.12)">
                                        <svg class="w-4 h-4 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-white/35 text-[10px] font-bold uppercase tracking-wider mb-1">{{ trans('contact.email_label') }}</p>
                                        <p class="text-white font-semibold text-sm">{{ st.email }}</p>
                                    </div>
                                    <svg class="w-4 h-4 text-white/15 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                                </a>

                                <!-- Adres -->
                                <div class="flex items-center gap-4 rounded-xl px-4 py-4">
                                    <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background:rgba(61,175,196,0.12)">
                                        <svg class="w-4 h-4 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-white/35 text-[10px] font-bold uppercase tracking-wider mb-1">{{ trans('contact.address') }}</p>
                                        <p class="text-white font-semibold text-sm">{{ st.address }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="pb-4"></div>
                        </div>
                    </div>

                    <!-- RIGHT: Form -->
                    <div class="lg:col-span-3">

                        <!-- Success -->
                        <div v-if="flash && flash.success"
                            class="flex items-start gap-4 rounded-2xl p-5 mb-5 border"
                            style="background:#f0fdf4;border-color:#bbf7d0">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style="background:#dcfce7">
                                <svg class="w-5 h-5" style="color:#16a34a" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-bold mb-1" style="color:#166534">{{ trans('contact.success_h') }}</h3>
                                <p class="text-sm" style="color:#15803d">{{ flash.success }}</p>
                            </div>
                        </div>

                        <div class="bg-white rounded-2xl border p-8 lg:p-10" style="border-color:#e8eaed;box-shadow:0 4px 24px rgba(14,30,61,0.06)">
                            <div class="mb-8">
                                <p class="text-[#0E7A8C] text-[11px] font-bold uppercase tracking-[4px] mb-2">{{ trans('contact.form_badge') }}</p>
                                <h2 class="text-2xl font-black text-[#0e1e3d] mb-2">{{ trans('contact.form_title') }}</h2>
                                <p class="text-sm text-gray-500">{{ trans('contact.form_desc') }}</p>
                            </div>

                            <form @submit.prevent="submit" class="space-y-5">
                                <!-- Ad + Email -->
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label class="block text-[11px] font-bold text-[#0e1e3d]/50 uppercase tracking-wider mb-2">
                                            {{ trans('contact.name') }} <span style="color:#f87171">*</span>
                                        </label>
                                        <input
                                            v-model="form.name"
                                            type="text"
                                            :placeholder="trans('contact.name_ph')"
                                            class="w-full px-4 py-3.5 rounded-xl border text-sm text-[#0e1e3d] placeholder-gray-300 focus:outline-none focus:ring-2 transition-all"
                                            :style="form.errors.name
                                                ? 'border-color:#fca5a5;background:#fff5f5'
                                                : 'border-color:#e5e7eb;background:#fafbfc'"
                                            :class="!form.errors.name && 'focus:border-[#0E7A8C] focus:ring-[#0E7A8C]/15'"
                                        />
                                        <p v-if="form.errors.name" class="text-xs mt-1.5" style="color:#ef4444">{{ form.errors.name }}</p>
                                    </div>
                                    <div>
                                        <label class="block text-[11px] font-bold text-[#0e1e3d]/50 uppercase tracking-wider mb-2">
                                            {{ trans('contact.email') }} <span style="color:#f87171">*</span>
                                        </label>
                                        <input
                                            v-model="form.email"
                                            type="email"
                                            :placeholder="trans('contact.email_ph')"
                                            class="w-full px-4 py-3.5 rounded-xl border text-sm text-[#0e1e3d] placeholder-gray-300 focus:outline-none focus:ring-2 transition-all"
                                            :style="form.errors.email
                                                ? 'border-color:#fca5a5;background:#fff5f5'
                                                : 'border-color:#e5e7eb;background:#fafbfc'"
                                            :class="!form.errors.email && 'focus:border-[#0E7A8C] focus:ring-[#0E7A8C]/15'"
                                        />
                                        <p v-if="form.errors.email" class="text-xs mt-1.5" style="color:#ef4444">{{ form.errors.email }}</p>
                                    </div>
                                </div>

                                <!-- Telefon -->
                                <div>
                                    <label class="block text-[11px] font-bold text-[#0e1e3d]/50 uppercase tracking-wider mb-2">{{ trans('contact.phone_lbl') }}</label>
                                    <input
                                        v-model="form.phone"
                                        type="tel"
                                        :placeholder="trans('contact.phone_ph')"
                                        class="w-full px-4 py-3.5 rounded-xl border text-sm text-[#0e1e3d] placeholder-gray-300 focus:outline-none focus:border-[#0E7A8C] focus:ring-2 focus:ring-[#0E7A8C]/15 transition-all"
                                        style="border-color:#e5e7eb;background:#fafbfc"
                                    />
                                </div>

                                <!-- Mesaj -->
                                <div>
                                    <label class="block text-[11px] font-bold text-[#0e1e3d]/50 uppercase tracking-wider mb-2">
                                        {{ trans('contact.message') }} <span style="color:#f87171">*</span>
                                    </label>
                                    <textarea
                                        v-model="form.message"
                                        rows="6"
                                        :placeholder="trans('contact.message_ph')"
                                        class="w-full px-4 py-3.5 rounded-xl border text-sm text-[#0e1e3d] placeholder-gray-300 focus:outline-none focus:ring-2 transition-all resize-none"
                                        :style="form.errors.message
                                            ? 'border-color:#fca5a5;background:#fff5f5'
                                            : 'border-color:#e5e7eb;background:#fafbfc'"
                                        :class="!form.errors.message && 'focus:border-[#0E7A8C] focus:ring-[#0E7A8C]/15'"
                                    />
                                    <p v-if="form.errors.message" class="text-xs mt-1.5" style="color:#ef4444">{{ form.errors.message }}</p>
                                </div>

                                <!-- Honeypot - botlar için tuzak alan -->
                                <div class="absolute -left-[9999px]" aria-hidden="true">
                                    <input type="text" name="website_url" v-model="form.website_url" tabindex="-1" autocomplete="off" />
                                </div>

                                <!-- Gönder -->
                                <button
                                    type="submit"
                                    :disabled="form.processing"
                                    class="w-full flex items-center justify-center gap-3 bg-[#0e1e3d] hover:bg-[#0E7A8C] text-white font-bold py-4 px-8 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <svg v-if="form.processing" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                    </svg>
                                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                                    </svg>
                                    {{ form.processing ? trans('contact.sending') : trans('contact.submit_btn') }}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- Google Maps -->
        <section>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12270.667535745613!2d36.99760558715819!3d39.74713300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x407eab2595605c99%3A0x4ebbc97eea7bf7b5!2s4B%20GRUP%20END.%20T%C4%B0C.!5e0!3m2!1str!2str!4v1772289275478!5m2!1str!2str"
                width="100%"
                height="420"
                style="border:0;display:block"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
        </section>

    </AppLayout>
</template>
