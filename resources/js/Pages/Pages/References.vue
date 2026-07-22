<script setup>
import { computed } from 'vue'
import AppLayout from '@/Layouts/AppLayout.vue'
import { useLocale } from '@/composables/useLocale.js'

const props = defineProps({
    partners: { type: Array, default: () => [] },
})

const { field } = useLocale()

const displayPartners = computed(() =>
    props.partners.map(p => ({ ...p, name: field(p, 'name') || p.name }))
)

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()
}

const references = [
    { name: 'Coffee & Study', logo: '/images/references/coffee-study.jpg?v=2' },
    { name: 'Colombia Coffee', logo: '/images/references/colombia-coffee.jpg?v=2' },
    { name: "Gloria Jean's", logo: '/images/references/gloria-jeans.jpg?v=2' },
    { name: 'T.C. Gençlik ve Spor Bakanlığı', logo: '/images/references/gsb.png?v=2' },
    { name: 'T.C. Millî Eğitim Bakanlığı', logo: '/images/references/meb.png?v=2' },
    { name: 'T.C. Millî Savunma Bakanlığı', logo: '/images/references/msb.png?v=2' },
    { name: 'T.C. Sağlık Bakanlığı', logo: '/images/references/saglik-bakanligi.png?v=2' },
    { name: 'Sivas Bilim ve Teknoloji Üniversitesi', logo: '/images/references/sivas-bilim-teknoloji.jpg?v=2' },
    { name: 'Sivas Cumhuriyet Üniversitesi', logo: '/images/references/sivas-cumhuriyet.png?v=2' },
    { name: 'TANAP', logo: '/images/references/tanap.png?v=2' },
    { name: 'Turgut Fırat Proje İnşaat A.Ş.', logo: '/images/references/turgut-firat.png?v=2' },
]
</script>

<template>
    <AppLayout>
        <!-- Hero -->
        <section class="bg-gradient-to-br from-[#1B3163] to-[#1B3163] py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-3xl">
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                        Referanslarımız
                    </h1>
                    <p class="text-white/70 text-lg leading-relaxed">
                        Endüstriyel mutfak ekipmanları alanında yetkili satış ve servis ortağı olduğumuz markalar ile güvenle hizmet verdiğimiz referans müşterilerimiz.
                    </p>
                </div>
            </div>
        </section>

        <!-- İş Ortakları -->
        <section class="bg-white py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-12">
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">İş Ortaklarımız</p>
                    <h2 class="text-3xl sm:text-4xl font-black text-[#0e1e3d]">Yetkili Satış ve Servis Ortağı Olduğumuz Markalar</h2>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    <component
                        v-for="partner in displayPartners" :key="partner.id"
                        :is="partner.website ? 'a' : 'div'"
                        :href="partner.website || undefined"
                        :target="partner.website ? '_blank' : undefined"
                        :rel="partner.website ? 'noopener noreferrer' : undefined"
                        class="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl p-6 h-32 hover:border-[#0E7A8C]/60 hover:shadow-md transition-all duration-300 cursor-default"
                    >
                        <img v-if="partner.logo_url" :src="partner.logo_url" :alt="partner.name"
                            loading="lazy"
                            class="max-h-14 max-w-full object-contain opacity-70 hover:opacity-100 transition-all duration-300"/>
                        <div v-else class="text-center">
                            <div class="w-12 h-12 bg-[#1B3163]/10 border border-[#1B3163]/20 rounded-lg flex items-center justify-center text-[#1B3163] font-extrabold text-sm mx-auto mb-1.5">
                                {{ getInitials(partner.name) }}
                            </div>
                            <span class="text-xs font-semibold text-[#1B3163]/60 leading-tight block">{{ partner.name }}</span>
                        </div>
                    </component>
                </div>
            </div>
        </section>

        <!-- Referans Müşteriler -->
        <section class="bg-[#f4f5f6] py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-12">
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Referanslarımız</p>
                    <h2 class="text-3xl sm:text-4xl font-black text-[#0e1e3d]">Hizmet Verdiğimiz Kurum ve İşletmeler</h2>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    <div v-for="(ref, i) in references" :key="i"
                        class="flex items-center justify-center bg-white border border-gray-200 rounded-xl p-6 h-44 hover:border-[#0E7A8C]/60 hover:shadow-md transition-all duration-300"
                    >
                        <img :src="ref.logo" :alt="ref.name" loading="lazy"
                            class="max-h-32 max-w-full object-contain transition-all duration-300"/>
                    </div>
                </div>
            </div>
        </section>
    </AppLayout>
</template>
