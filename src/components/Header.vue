<script setup>
import { Plus } from 'lucide-vue-next'
import ThemeToggle from './ThemeToggle.vue'

defineProps({
  isDark: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['open-create', 'toggle-theme'])
</script>

<template>
  <header class="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div>
      <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
        TaskFlow SPA
      </h1>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Local Storage destekli modern görev yönetim uygulaması
      </p>
    </div>

    <div class="flex items-center gap-3">
      <!-- Tema Değiştirici Buton (Props ve Emits ile üst bileşene bağlı) -->
      <ThemeToggle
        :is-dark="isDark"
        @toggle-theme="emit('toggle-theme')"
      />

      <button
        @click="emit('open-create')"
        class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition cursor-pointer text-sm"
      >
        <Plus class="w-4 h-4" /> Yeni Görev Ekle
      </button>
    </div>
  </header>
</template>