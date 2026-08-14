<script setup>
import { Link, usePage, router } from '@inertiajs/vue3'
import { computed } from 'vue'

const page = usePage()
const user = computed(() => page.props.auth?.user)
const unreadContacts = computed(() => page.props.unreadContacts || 0)

function logout() {
    router.post('/admin/logout')
}
</script>

<template>
  <div class="min-h-screen bg-[#F4F6F9] flex">
    <aside class="w-60 bg-[#1B3163] text-white flex flex-col">
      <div class="px-5 py-5 border-b border-white/10">
        <div class="bg-white rounded-lg px-3 py-2.5 inline-block">
          <img src="/images/logo.png" alt="4B Grup" class="h-8 w-auto" />
        </div>
      </div>
      <nav class="flex-1 py-4 flex flex-col gap-1 px-3">
        <Link href="/admin/products" class="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
          Ürünler
        </Link>
        <Link href="/admin/categories" class="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
          Kategoriler
        </Link>
        <Link href="/admin/projects" class="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
          Projeler
        </Link>
        <Link href="/admin/partners" class="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
          Markalar / Tedarikçiler
        </Link>
        <Link href="/admin/about" class="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
          Hakkımızda
        </Link>
        <Link href="/admin/production" class="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
          Üretim
        </Link>
        <Link href="/admin/contacts" class="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors flex items-center justify-between">
          <span>İletişim Mesajları</span>
          <span v-if="unreadContacts > 0" class="bg-[#0E7A8C] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
            {{ unreadContacts }}
          </span>
        </Link>
      </nav>
      <div class="px-5 py-4 border-t border-white/10 text-xs text-white/60">
        <div class="mb-2">{{ user?.name }}</div>
        <button @click="logout" class="text-[#3DAFC4] font-semibold hover:underline">Çıkış Yap</button>
      </div>
    </aside>

    <main class="flex-1 min-w-0">
      <div class="max-w-6xl mx-auto px-6 py-8">
        <div v-if="$page.props.flash?.success" class="mb-4 px-4 py-3 rounded-lg bg-green-50 text-green-700 text-sm font-semibold">
          {{ $page.props.flash.success }}
        </div>
        <div v-if="$page.props.flash?.error" class="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm font-semibold">
          {{ $page.props.flash.error }}
        </div>
        <slot />
      </div>
    </main>
  </div>
</template>
