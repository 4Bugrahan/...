<script setup>
import { Head, useForm } from '@inertiajs/vue3'

const form = useForm({
  email: '',
  password: '',
  remember: false,
})

function submit() {
  form.post('/admin/login', {
    onFinish: () => form.reset('password'),
  })
}
</script>

<template>
  <Head><title>Admin Girişi | 4B Grup</title></Head>

  <div class="min-h-screen bg-[#1B3163] flex items-center justify-center px-4">
    <div class="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
      <h1 class="text-xl font-bold text-[#1B3163] mb-1">4B Grup Panel</h1>
      <p class="text-sm text-gray-500 mb-6">Yönetim paneline giriş yapın.</p>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">E-posta</label>
          <input v-model="form.email" type="email" required autofocus
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]" />
          <p v-if="form.errors.email" class="text-red-600 text-xs mt-1">{{ form.errors.email }}</p>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Şifre</label>
          <input v-model="form.password" type="password" required
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]" />
        </div>

        <label class="flex items-center gap-2 text-sm text-gray-600">
          <input v-model="form.remember" type="checkbox" class="rounded border-gray-300" />
          Beni hatırla
        </label>

        <button type="submit" :disabled="form.processing"
          class="w-full bg-[#0E7A8C] hover:bg-[#0c6a7a] text-white font-bold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50">
          {{ form.processing ? 'Giriş yapılıyor...' : 'Giriş Yap' }}
        </button>
      </form>
    </div>
  </div>
</template>
