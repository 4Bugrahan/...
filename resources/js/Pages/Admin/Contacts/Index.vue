<script setup>
import { Head, Link, router } from '@inertiajs/vue3'
import { ref } from 'vue'
import AdminLayout from '@/Layouts/AdminLayout.vue'

const props = defineProps({
  contacts: Object,
  filters: Object,
})

const search = ref(props.filters?.search || '')

function applyFilters() {
  router.get('/admin/contacts', { search: search.value }, {
    preserveState: true,
    replace: true,
  })
}

function destroy(contact) {
  if (confirm(`"${contact.name}" adlı kişinin mesajını silmek istediğine emin misin?`)) {
    router.delete(`/admin/contacts/${contact.id}`)
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <Head><title>İletişim Mesajları | Admin</title></Head>

  <AdminLayout>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-[#1B3163]">İletişim Mesajları</h1>
    </div>

    <div class="flex gap-3 mb-4">
      <input v-model="search" @keyup.enter="applyFilters" type="text" placeholder="İsim, e-posta veya mesajda ara..."
        class="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]" />
      <button @click="applyFilters" class="text-sm font-semibold text-[#0E7A8C]">Filtrele</button>
    </div>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-[#F4F6F9] text-gray-500 text-xs uppercase">
          <tr>
            <th class="text-left px-4 py-3">Durum</th>
            <th class="text-left px-4 py-3">Ad Soyad</th>
            <th class="text-left px-4 py-3">E-posta</th>
            <th class="text-left px-4 py-3">Telefon</th>
            <th class="text-left px-4 py-3">Mesaj (özet)</th>
            <th class="text-left px-4 py-3">Tarih</th>
            <th class="text-right px-4 py-3">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts.data" :key="contact.id" class="border-t border-gray-100"
              :class="!contact.read_at ? 'bg-[#0E7A8C]/5' : ''">
            <td class="px-4 py-3">
              <span v-if="!contact.read_at" class="inline-block w-2.5 h-2.5 rounded-full bg-[#0E7A8C]" title="Okunmadı"></span>
              <span v-else class="inline-block w-2.5 h-2.5 rounded-full bg-gray-200" title="Okundu"></span>
            </td>
            <td class="px-4 py-3 font-semibold text-gray-800">
              <Link :href="`/admin/contacts/${contact.id}`" class="hover:text-[#0E7A8C]">{{ contact.name }}</Link>
            </td>
            <td class="px-4 py-3 text-gray-600">{{ contact.email }}</td>
            <td class="px-4 py-3 text-gray-600">{{ contact.phone || '—' }}</td>
            <td class="px-4 py-3 text-gray-500 max-w-xs truncate">{{ contact.message }}</td>
            <td class="px-4 py-3 text-gray-500 whitespace-nowrap">{{ formatDate(contact.created_at) }}</td>
            <td class="px-4 py-3 text-right whitespace-nowrap">
              <Link :href="`/admin/contacts/${contact.id}`" class="text-[#0E7A8C] font-semibold text-xs mr-3">Görüntüle</Link>
              <button @click="destroy(contact)" class="text-red-500 font-semibold text-xs">Sil</button>
            </td>
          </tr>
          <tr v-if="contacts.data.length === 0">
            <td colspan="7" class="px-4 py-10 text-center text-gray-400">Henüz mesaj yok.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="contacts.links?.length > 3" class="flex flex-wrap gap-1 mt-4 justify-center">
      <Link v-for="(link, i) in contacts.links" :key="i" :href="link.url || ''"
        v-html="link.label"
        class="px-3 py-1.5 rounded-lg text-xs font-semibold"
        :class="link.active ? 'bg-[#0E7A8C] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'" />
    </div>
  </AdminLayout>
</template>
