<script setup>
import { Sun, Moon } from 'lucide-vue-next'

defineProps({
  isDark: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggle-theme'])
</script>

<template>
  <button
    @click="emit('toggle-theme')"
    class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer shadow-xs"
    :title="isDark ? 'Açık Mod' : 'Karanlık Mod'"
  >
    <Sun v-if="isDark" class="w-4 h-4 text-amber-400" />
    <Moon v-else class="w-4 h-4 text-slate-600" />
  </button>
</template>