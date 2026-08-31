<script setup>
import { AlertTriangle } from 'lucide-vue-next'

defineProps({
  isOpen: Boolean,
  title: {
    type: String,
    default: 'Görevi Silmek İstediğinize Emin misiniz?'
  },
  message: {
    type: String,
    default: 'Bu işlem geri alınamaz ve görev kalıcı olarak silinir.'
  }
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
    <div class="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-100 text-center">
      <div class="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle class="w-6 h-6" />
      </div>
      <h4 class="text-base font-bold text-slate-800">{{ title }}</h4>
      <p class="text-sm text-slate-500 mt-2">{{ message }}</p>

      <div class="flex items-center justify-center gap-3 mt-6">
        <button
          @click="emit('cancel')"
          class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
        >
          Vazgeç
        </button>
        <button
          @click="emit('confirm')"
          class="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition cursor-pointer"
        >
          Evet, Sil
        </button>
      </div>
    </div>
  </div>
</template>