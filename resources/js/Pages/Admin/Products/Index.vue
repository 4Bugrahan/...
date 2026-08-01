<script setup>
import { Head, Link, router } from '@inertiajs/vue3'
import { ref } from 'vue'
import AdminLayout from '@/Layouts/AdminLayout.vue'

const props = defineProps({
  products: Object,
  categories: Array,
  filters: Object,
})

const search = ref(props.filters?.search || '')
const categoryId = ref(props.filters?.category_id || '')

function applyFilters() {
  router.get('/admin/products', { search: search.value, category_id: categoryId.value }, {
    preserveState: true,
    replace: true,
  })
}

function destroy(product) {
  if (confirm(`"${product.name}" ürününü silmek istediğine emin misin?`)) {
    router.delete(`/admin/products/${product.id}`)
  }
}
</script>

<template>
  <Head><title>Ürünler | Admin</title></Head>

  <AdminLayout>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-[#1B3163]">Ürünler</h1>
      <Link href="/admin/products/create" class="bg-[#0E7A8C] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#0c6a7a] transition-colors">
        + Yeni Ürün
      </Link>
    </div>

    <div class="flex gap-3 mb-4">
      <input v-model="search" @keyup.enter="applyFilters" type="text" placeholder="Ürün ara..."
        class="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]" />
      <select v-model="categoryId" @change="applyFilters" class="border border-gray-200 rounded-lg px-3 py-2 text-sm">
        <option value="">Tüm Kategoriler</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
      <button @click="applyFilters" class="text-sm font-semibold text-[#0E7A8C]">Filtrele</button>
    </div>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-[#F4F6F9] text-gray-500 text-xs uppercase">
          <tr>
            <th class="text-left px-4 py-3">Görsel</th>
            <th class="text-left px-4 py-3">Ad</th>
            <th class="text-left px-4 py-3">Kategori</th>
            <th class="text-left px-4 py-3">Öne Çıkan</th>
            <th class="text-left px-4 py-3">Aktif</th>
            <th class="text-right px-4 py-3">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products.data" :key="product.id" class="border-t border-gray-100">
            <td class="px-4 py-3">
              <img v-if="product.image_urls?.[0]" :src="product.image_urls[0]" class="w-12 h-12 object-cover rounded-lg" />
              <div v-else class="w-12 h-12 bg-gray-100 rounded-lg"></div>
            </td>
            <td class="px-4 py-3 font-semibold text-gray-800">{{ product.name }}</td>
            <td class="px-4 py-3 text-gray-500">{{ product.category?.name }}</td>
            <td class="px-4 py-3">
              <span v-if="product.featured" class="text-xs font-bold text-[#0E7A8C]">Evet</span>
              <span v-else class="text-xs text-gray-400">—</span>
            </td>
            <td class="px-4 py-3">
              <span :class="product.is_active ? 'text-green-600' : 'text-red-500'" class="text-xs font-bold">
                {{ product.is_active ? 'Aktif' : 'Pasif' }}
              </span>
            </td>
            <td class="px-4 py-3 text-right">
              <Link :href="`/admin/products/${product.id}/edit`" class="text-[#0E7A8C] font-semibold text-xs mr-3">Düzenle</Link>
              <button @click="destroy(product)" class="text-red-500 font-semibold text-xs">Sil</button>
            </td>
          </tr>
          <tr v-if="products.data.length === 0">
            <td colspan="6" class="px-4 py-10 text-center text-gray-400">Ürün bulunamadı.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="products.links?.length > 3" class="flex gap-1 mt-4 justify-center">
      <Link v-for="(link, i) in products.links" :key="i" :href="link.url || ''"
        v-html="link.label"
        class="px-3 py-1.5 rounded-lg text-xs font-semibold"
        :class="link.active ? 'bg-[#0E7A8C] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'" />
    </div>
  </AdminLayout>
</template>
