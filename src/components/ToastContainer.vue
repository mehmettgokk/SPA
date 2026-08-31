<script setup>
import { useToast } from '../composables/useToast'
import { CheckCircle2, AlertCircle, Info } from 'lucide-vue-next'

const { toasts } = useToast()
</script>

<template>
  <!-- Ekranın sağ üst köşesinde sabit duran bildirim alanı -->
  <aside 
    aria-label="Bildirimler" 
    class="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4"
  >
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="pointer-events-auto flex items-center gap-3 p-3.5 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 transform translate-y-0"
      :class="{
        'bg-emerald-50 border-emerald-200 text-emerald-800': toast.type === 'success',
        'bg-rose-50 border-rose-200 text-rose-800': toast.type === 'error',
        'bg-indigo-50 border-indigo-200 text-indigo-800': toast.type === 'info'
      }"
    >
      <CheckCircle2 v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-600 shrink-0" />
      <AlertCircle v-else-if="toast.type === 'error'" class="w-5 h-5 text-rose-600 shrink-0" />
      <Info v-else class="w-5 h-5 text-indigo-600 shrink-0" />

      <span>{{ toast.message }}</span>
    </div>
  </aside>
</template>