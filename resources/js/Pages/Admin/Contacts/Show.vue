<script setup>
import { Head, Link, router } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'

const props = defineProps({
  contact: Object,
})

function destroy() {
  if (confirm(`"${props.contact.name}" adlı kişinin mesajını silmek istediğine emin misin?`)) {
    router.delete(`/admin/contacts/${props.contact.id}`)
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <Head><title>{{ contact.name }} | İletişim Mesajı | Admin</title></Head>

  <AdminLayout>
    <div class="flex items-center justify-between mb-6">
      <div>
        <Link href="/admin/contacts" class="text-xs font-semibold text-gray-400 hover:text-[#0E7A8C]">&larr; İletişim Mesajları</Link>
        <h1 class="text-xl font-bold text-[#1B3163] mt-1">{{ contact.name }}</h1>
      </div>
      <button @click="destroy" class="text-red-500 font-semibold text-sm border border-red-200 rounded-lg px-4 py-2 hover:bg-red-50">
        Sil
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6 pb-6 border-b border-gray-100">
        <div>
          <dt class="text-xs font-semibold text-gray-400 uppercase mb-1">Ad Soyad</dt>
          <dd class="text-sm text-gray-800 font-semibold">{{ contact.name }}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold text-gray-400 uppercase mb-1">Tarih</dt>
          <dd class="text-sm text-gray-800">{{ formatDate(contact.created_at) }}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold text-gray-400 uppercase mb-1">E-posta</dt>
          <dd class="text-sm">
            <a :href="`mailto:${contact.email}`" class="text-[#0E7A8C] font-semibold hover:underline">{{ contact.email }}</a>
          </dd>
        </div>
        <div>
          <dt class="text-xs font-semibold text-gray-400 uppercase mb-1">Telefon</dt>
          <dd class="text-sm">
            <a v-if="contact.phone" :href="`tel:${contact.phone}`" class="text-[#0E7A8C] font-semibold hover:underline">{{ contact.phone }}</a>
            <span v-else class="text-gray-400">—</span>
          </dd>
        </div>
      </dl>

      <div>
        <dt class="text-xs font-semibold text-gray-400 uppercase mb-2">Mesaj</dt>
        <dd class="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{{ contact.message }}</dd>
      </div>
    </div>
  </AdminLayout>
</template>
