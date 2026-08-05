<script setup>
import { Head, Link, router } from '@inertiajs/vue3'
import { ref } from 'vue'
import AdminLayout from '@/Layouts/AdminLayout.vue'

const props = defineProps({
  tree: { type: Array, default: null },
  flat: { type: Array, default: null },
  filters: Object,
})

const search = ref(props.filters?.search || '')

// Aramada değil, ağaç görünümündeyken hangi ana kategorilerin altı açık —
// varsayılan hepsi açık, kullanıcı isterse daraltabilir.
const collapsed = ref(new Set())
function toggle(id) {
  const next = new Set(collapsed.value)
  next.has(id) ? next.delete(id) : next.add(id)
  collapsed.value = next
}

function applyFilters() {
  router.get('/admin/categories', { search: search.value }, { preserveState: true, replace: true })
}

function destroy(category) {
  if (confirm(`"${category.name}" kategorisini silmek istediğine emin misin?`)) {
    router.delete(`/admin/categories/${category.id}`)
  }
}
</script>

<template>
  <Head><title>Kategoriler | Admin</title></Head>

  <AdminLayout>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-[#1B3163]">Kategoriler</h1>
      <Link href="/admin/categories/create" class="bg-[#0E7A8C] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#0c6a7a] transition-colors">
        + Yeni Kategori
      </Link>
    </div>

    <div class="flex gap-3 mb-4">
      <input v-model="search" @keyup.enter="applyFilters" type="text" placeholder="Kategori ara..."
        class="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]" />
      <button @click="applyFilters" class="text-sm font-semibold text-[#0E7A8C]">Filtrele</button>
    </div>

    <!-- AĞAÇ GÖRÜNÜMÜ (arama yokken) -->
    <div v-if="tree" class="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-gray-100">
      <div v-for="parent in tree" :key="parent.id">
        <!-- Ana kategori satırı -->
        <div class="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors">
          <button @click="toggle(parent.id)" class="text-gray-400 hover:text-[#0E7A8C] flex-shrink-0" :aria-label="collapsed.has(parent.id) ? 'Genişlet' : 'Daralt'">
            <svg class="w-4 h-4 transition-transform duration-200" :class="collapsed.has(parent.id) ? '-rotate-90' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <img v-if="parent.image_url" :src="parent.image_url" class="w-10 h-10 object-cover rounded-lg flex-shrink-0" />
          <div v-else class="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0"></div>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-gray-800 text-sm truncate">{{ parent.name }}</div>
            <div class="text-xs text-gray-400">
              {{ parent.children.length }} alt kategori · {{ parent.products_count }} ürün
            </div>
          </div>
          <span :class="parent.is_active ? 'text-green-600' : 'text-red-500'" class="text-xs font-bold flex-shrink-0">
            {{ parent.is_active ? 'Aktif' : 'Pasif' }}
          </span>
          <Link :href="`/admin/categories/${parent.id}/edit`" class="text-[#0E7A8C] font-semibold text-xs flex-shrink-0">Düzenle</Link>
          <button @click="destroy(parent)" class="text-red-500 font-semibold text-xs flex-shrink-0">Sil</button>
        </div>

        <!-- Alt kategoriler -->
        <div v-show="!collapsed.has(parent.id)" class="bg-gray-50/60">
          <div v-for="child in parent.children" :key="child.id"
            class="flex items-center gap-3 pl-14 pr-4 py-2.5 border-t border-gray-100 hover:bg-gray-50 transition-colors">
            <img v-if="child.image_url" :src="child.image_url" class="w-8 h-8 object-cover rounded-md flex-shrink-0" />
            <div v-else class="w-8 h-8 bg-gray-200 rounded-md flex-shrink-0"></div>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-gray-700 text-sm truncate">{{ child.name }}</div>
              <div class="text-xs text-gray-400">{{ child.products_count }} ürün</div>
            </div>
            <span :class="child.is_active ? 'text-green-600' : 'text-red-500'" class="text-xs font-bold flex-shrink-0">
              {{ child.is_active ? 'Aktif' : 'Pasif' }}
            </span>
            <Link :href="`/admin/categories/${child.id}/edit`" class="text-[#0E7A8C] font-semibold text-xs flex-shrink-0">Düzenle</Link>
            <button @click="destroy(child)" class="text-red-500 font-semibold text-xs flex-shrink-0">Sil</button>
          </div>
          <div v-if="parent.children.length === 0" class="pl-14 pr-4 py-2.5 border-t border-gray-100 text-xs text-gray-400 italic">
            Alt kategori yok
          </div>
        </div>
      </div>

      <div v-if="tree.length === 0" class="px-4 py-10 text-center text-gray-400 text-sm">Kategori bulunamadı.</div>
    </div>

    <!-- DÜZ LİSTE (arama yaparken) -->
    <div v-else class="bg-white rounded-xl shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-[#F4F6F9] text-gray-500 text-xs uppercase">
          <tr>
            <th class="text-left px-4 py-3">Görsel</th>
            <th class="text-left px-4 py-3">Ad</th>
            <th class="text-left px-4 py-3">Üst Kategori</th>
            <th class="text-left px-4 py-3">Ürün Sayısı</th>
            <th class="text-left px-4 py-3">Aktif</th>
            <th class="text-right px-4 py-3">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in flat" :key="category.id" class="border-t border-gray-100">
            <td class="px-4 py-3">
              <img v-if="category.image_url" :src="category.image_url" class="w-12 h-12 object-cover rounded-lg" />
              <div v-else class="w-12 h-12 bg-gray-100 rounded-lg"></div>
            </td>
            <td class="px-4 py-3 font-semibold text-gray-800">{{ category.name }}</td>
            <td class="px-4 py-3 text-gray-500">{{ category.parent?.name || '—' }}</td>
            <td class="px-4 py-3 text-gray-500">{{ category.products_count }}</td>
            <td class="px-4 py-3">
              <span :class="category.is_active ? 'text-green-600' : 'text-red-500'" class="text-xs font-bold">
                {{ category.is_active ? 'Aktif' : 'Pasif' }}
              </span>
            </td>
            <td class="px-4 py-3 text-right">
              <Link :href="`/admin/categories/${category.id}/edit`" class="text-[#0E7A8C] font-semibold text-xs mr-3">Düzenle</Link>
              <button @click="destroy(category)" class="text-red-500 font-semibold text-xs">Sil</button>
            </td>
          </tr>
          <tr v-if="flat.length === 0">
            <td colspan="6" class="px-4 py-10 text-center text-gray-400">Kategori bulunamadı.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>
