<script setup>
import { useTodoStore } from '../stores/todoStore'
import TodoItem from './TodoItem.vue'
import { Inbox } from 'lucide-vue-next'

const todoStore = useTodoStore()

const emit = defineEmits(['open-edit', 'request-delete', 'toggle-task'])
</script>

<template>
  <div class="space-y-3">
    <!-- Liste Boş Durumu (Empty State) -->
    <div
      v-if="todoStore.filteredTasks.length === 0"
      class="bg-white rounded-xl border border-slate-200 border-dashed p-10 text-center flex flex-col items-center justify-center"
    >
      <div class="p-3 bg-slate-100 rounded-full text-slate-400 mb-3">
        <Inbox class="w-8 h-8" />
      </div>
      <h4 class="text-base font-semibold text-slate-700">Görev Bulunamadı</h4>
      <p class="text-sm text-slate-400 mt-1 max-w-sm">
        Arama/filtreleme kriterlerinize uygun görev yok veya henüz yeni bir görev oluşturmadınız.
      </p>
    </div>

    <!-- Görev Kartları Döngüsü -->
    <div v-else class="space-y-3">
      <TodoItem
        v-for="task in todoStore.filteredTasks"
        :key="task.id"
        :task="task"
        @toggle="(id) => emit('toggle-task', id)"
        @edit="(task) => emit('open-edit', task)"
        @delete="(id) => emit('request-delete', id)"
      />
    </div>
  </div>
</template>