<script setup>
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  editingTask: Object
})

const emit = defineEmits(['close', 'save'])

const title = ref('')
const description = ref('')
const priority = ref('medium')
const dueDate = ref('')
const errors = ref({})

// editingTask değişimi için form kısımlarını doldurma
watch(
  () => props.editingTask,
  (newTask) => {
    if (newTask) {
      title.value = newTask.title
      description.value = newTask.description || ''
      priority.value = newTask.priority || 'medium'
      dueDate.value = newTask.dueDate || ''
    } else {
      title.value = ''
      description.value = ''
      priority.value = 'medium'
      dueDate.value = ''
    }
    errors.value = {}
  },
  { immediate: true }
)

const validate = () => {
  errors.value = {}
  if (!title.value.trim()) {
    errors.value.title = 'Görev başlığı zorunludur.'
  }
  if (!priority.value) {
    errors.value.priority = 'Öncelik seçimi zorunludur.'
  }
  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (!validate()) return

  emit('save', {
    id: props.editingTask ? props.editingTask.id : null,
    title: title.value,
    description: description.value,
    priority: priority.value,
    dueDate: dueDate.value || null
  })
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <h3 class="text-lg font-bold text-slate-800">
          {{ editingTask ? 'Görevi Düzenle' : 'Yeni Görev Ekle' }}
        </h3>
        <button @click="emit('close')" class="text-slate-400 hover:text-slate-600 transition cursor-pointer">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Başlık (Zorunlu) -->
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Başlık *</label>
          <input
            v-model="title"
            type="text"
            placeholder="Örn: Vue Router mimarisini tamamla"
            class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            :class="errors.title ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'"
          />
          <p v-if="errors.title" class="text-xs text-rose-600 mt-1">{{ errors.title }}</p>
        </div>

        <!-- Açıklama (Opsiyonel) -->
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Açıklama</label>
          <textarea
            v-model="description"
            rows="3"
            placeholder="Görevle ilgili ek detaylar..."
            class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <!-- Öncelik ve Son Teslim Tarihi -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Öncelik *</label>
            <select
              v-model="priority"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="low">Düşük</option>
              <option value="medium">Orta</option>
              <option value="high">Yüksek</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Son Teslim Tarihi</label>
            <input
              v-model="dueDate"
              type="date"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            />
          </div>
        </div>

        <!-- Butonlar -->
        <div class="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
          <button
            type="button"
            @click="emit('close')"
            class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
          >
            İptal
          </button>
          <button
            type="submit"
            class="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition cursor-pointer"
          >
            {{ editingTask ? 'Güncelle' : 'Oluştur' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>