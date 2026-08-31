<script setup>
import { computed } from 'vue'
import { Calendar, Trash2, Edit3, CheckCircle, Circle, AlertCircle } from 'lucide-vue-next'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'edit', 'delete'])

const priorityBadge = computed(() => {
  switch (props.task.priority) {
    case 'high':
      return { label: 'Yüksek', class: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' }
    case 'medium':
      return { label: 'Orta', class: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' }
    case 'low':
      return { label: 'Düşük', class: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' }
    default:
      return { label: 'Orta', class: 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700' }
  }
})

const isOverdue = computed(() => {
  if (!props.task.dueDate || props.task.isCompleted) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(props.task.dueDate)
  return due < today
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div
    :class="[
      'group p-4 rounded-xl border transition-all duration-200 shadow-xs hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
      task.isCompleted 
        ? 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40' 
        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-500/30',
      isOverdue ? 'border-rose-300 dark:border-rose-800 bg-rose-50/20 dark:bg-rose-950/20' : ''
    ]"
  >
    <div class="flex items-start gap-3 flex-1">
      <button 
        @click="emit('toggle', task.id)"
        class="mt-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer shrink-0"
      >
        <CheckCircle v-if="task.isCompleted" class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <Circle v-else class="w-5 h-5" />
      </button>

      <div class="space-y-1">
        <div class="flex items-center gap-2 flex-wrap">
          <h3
            :class="[
              'text-base font-semibold transition',
              task.isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'
            ]"
          >
            {{ task.title }}
          </h3>

          <span :class="['text-xs px-2 py-0.5 rounded-full border font-medium', priorityBadge.class]">
            {{ priorityBadge.label }}
          </span>

          <span v-if="isOverdue" class="text-xs px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-medium flex items-center gap-1 border border-rose-200 dark:border-rose-800">
            <AlertCircle class="w-3 h-3" /> Süresi Geçti
          </span>
        </div>

        <p v-if="task.description" :class="['text-sm', task.isCompleted ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-300']">
          {{ task.description }}
        </p>

        <div class="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 pt-1">
          <span v-if="task.dueDate" class="flex items-center gap-1 font-medium" :class="isOverdue ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'">
            <Calendar class="w-3.5 h-3.5" /> Son Teslim: {{ formatDate(task.dueDate) }}
          </span>
          <span>Oluşturuldu: {{ formatDate(task.createdAt) }}</span>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-1 self-end sm:self-center">
      <button
        @click="emit('edit', task)"
        class="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg transition cursor-pointer"
        title="Düzenle"
      >
        <Edit3 class="w-4 h-4" />
      </button>
      <button
        @click="emit('delete', task.id)"
        class="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition cursor-pointer"
        title="Sil"
      >
        <Trash2 class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>