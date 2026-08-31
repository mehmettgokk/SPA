<script setup>
import { useTodoStore } from '../stores/todoStore'
import { Search, ArrowUpDown, Filter } from 'lucide-vue-next'

const todoStore = useTodoStore()

const filters = [
  { label: 'Tümü', value: 'all' },
  { label: 'Tamamlananlar', value: 'completed' },
  { label: 'Bekleyenler', value: 'pending' },
  { label: 'Yüksek Öncelik', value: 'high' },
  { label: 'Orta Öncelik', value: 'medium' },
  { label: 'Düşük Öncelik', value: 'low' }
]
</script>

<template>
  <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs mb-6 space-y-4 transition-colors">
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input
          v-model="todoStore.searchQuery"
          type="text"
          placeholder="Görev başlığı ile ara..."
          class="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      <div class="relative min-w-[200px]">
        <ArrowUpDown class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
        <select
          v-model="todoStore.currentSort"
          class="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition appearance-none cursor-pointer"
        >
          <option value="createdAt-desc">En Yeni Eklenen</option>
          <option value="createdAt-asc">En Eski Eklenen</option>
          <option value="dueDate-asc">Son Teslim (Yaklaşan)</option>
          <option value="priority-desc">Öncelik (Yüksek → Düşük)</option>
          <option value="alphabet-asc">Alfabetik (A → Z)</option>
          <option value="alphabet-desc">Alfabetik (Z → A)</option>
        </select>
      </div>
    </div>

    <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
      <Filter class="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
      <button
        v-for="filter in filters"
        :key="filter.value"
        @click="todoStore.currentFilter = filter.value"
        :class="[
          'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer',
          todoStore.currentFilter === filter.value
            ? 'bg-indigo-600 text-white shadow-xs'
            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
        ]"
      >
        {{ filter.label }}
      </button>
    </div>
  </div>
</template>