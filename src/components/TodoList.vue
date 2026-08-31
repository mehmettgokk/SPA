<script setup>
import { useTodoStore } from '../stores/todoStore'
import { useDragAndDrop } from '../composables/useDragAndDrop'
import { useToast } from '../composables/useToast'
import TodoItem from './TodoItem.vue'
import { Inbox } from 'lucide-vue-next'

const todoStore = useTodoStore()
const { showToast } = useToast()
const { handleDragStart, handleDragEnd, handleDrop } = useDragAndDrop()

const emit = defineEmits(['open-edit', 'request-delete', 'toggle-task'])

const onReorder = (newOrderedList) => {
  todoStore.reorderTasks(newOrderedList)
  showToast('Görev sıralaması güncellendi.', 'info', 1500)
}
</script>

<template>
  <div class="space-y-3">
    <!-- Liste Boş Durumu -->
    <div
      v-if="todoStore.filteredTasks.length === 0"
      class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-dashed p-10 text-center flex flex-col items-center justify-center transition-colors"
    >
      <div class="p-3 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-400 mb-3">
        <Inbox class="w-8 h-8" />
      </div>
      <h4 class="text-base font-semibold text-slate-700 dark:text-slate-200">Görev Bulunamadı</h4>
      <p class="text-sm text-slate-400 mt-1 max-w-sm">
        Arama/filtreleme kriterlerinize uygun görev yok veya henüz yeni bir görev oluşturmadınız.
      </p>
    </div>

    <!-- Sürüklenebilir Kartlar Döngüsü -->
    <div v-else class="space-y-3">
      <TodoItem
        v-for="(task, index) in todoStore.filteredTasks"
        :key="task.id"
        :task="task"
        :index="index"
        @drag-start="handleDragStart"
        @drag-end="handleDragEnd"
        @item-drop="(targetIndex) => handleDrop(targetIndex, todoStore.filteredTasks, onReorder)"
        @toggle="(id) => emit('toggle-task', id)"
        @edit="(task) => emit('open-edit', task)"
        @delete="(id) => emit('request-delete', id)"
      />
    </div>
  </div>
</template>