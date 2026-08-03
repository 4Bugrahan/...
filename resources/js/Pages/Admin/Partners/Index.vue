<script setup>
import { Head, Link, router } from '@inertiajs/vue3'
import { ref } from 'vue'
import AdminLayout from '@/Layouts/AdminLayout.vue'

const props = defineProps({
  partners: Object,
  filters: Object,
})

const search = ref(props.filters?.search || '')

function applyFilters() {
  router.get('/admin/partners', { search: search.value }, {
    preserveState: true,
    replace: true,
  })
}

function destroy(partner) {
  if (confirm(`"${partner.name}" markasını silmek istediğine emin misin?`)) {
    router.delete(`/admin/partners/${partner.id}`)
  }
}
</script>

<template>
  <Head><title>Markalar / Tedarikçiler | Admin</title></Head>

  <AdminLayout>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-[#1B3163]">Markalar / Tedarikçiler</h1>
      <Link href="/admin/partners/create" class="bg-[#0E7A8C] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#0c6a7a] transition-colors">
        + Yeni Marka
      </Link>
    </div>

    <div class="flex gap-3 mb-4">
      <input v-model="search" @keyup.enter="applyFilters" type="text" placeholder="Marka ara..."
        class="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]" />
      <button @click="applyFilters" class="text-sm font-semibold text-[#0E7A8C]">Filtrele</button>
    </div>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-[#F4F6F9] text-gray-500 text-xs uppercase">
          <tr>
            <th class="text-left px-4 py-3">Logo</th>
            <th class="text-left px-4 py-3">Ad</th>
            <th class="text-left px-4 py-3">Sıra</th>
            <th class="text-left px-4 py-3">Aktif</th>
            <th class="text-right px-4 py-3">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="partner in partners.data" :key="partner.id" class="border-t border-gray-100">
            <td class="px-4 py-3">
              <img v-if="partner.logo_url" :src="partner.logo_url" class="w-16 h-12 object-contain bg-gray-50 rounded-lg border border-gray-100" />
              <div v-else class="w-16 h-12 bg-gray-100 rounded-lg"></div>
            </td>
            <td class="px-4 py-3 font-semibold text-gray-800">{{ partner.name }}</td>
            <td class="px-4 py-3 text-gray-500">{{ partner.order }}</td>
            <td class="px-4 py-3">
              <span :class="partner.is_active ? 'text-green-600' : 'text-red-500'" class="text-xs font-bold">
                {{ partner.is_active ? 'Aktif' : 'Pasif' }}
              </span>
            </td>
            <td class="px-4 py-3 text-right">
              <Link :href="`/admin/partners/${partner.id}/edit`" class="text-[#0E7A8C] font-semibold text-xs mr-3">Düzenle</Link>
              <button @click="destroy(partner)" class="text-red-500 font-semibold text-xs">Sil</button>
            </td>
          </tr>
          <tr v-if="partners.data.length === 0">
            <td colspan="5" class="px-4 py-10 text-center text-gray-400">Marka bulunamadı.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="partners.links?.length > 3" class="flex gap-1 mt-4 justify-center">
      <Link v-for="(link, i) in partners.links" :key="i" :href="link.url || ''"
        v-html="link.label"
        class="px-3 py-1.5 rounded-lg text-xs font-semibold"
        :class="link.active ? 'bg-[#0E7A8C] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'" />
    </div>
  </AdminLayout>
</template>
