<script setup>
import { useTodoStore } from '../stores/todoStore'
import { Search, ArrowUpDown, Filter } from 'lucide-vue-next'

const todoStore = useTodoStore()

// Filtre seçenekleri
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
  <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 space-y-4">
    <!-- Üst Satır: Arama Çubuğu & Sıralama Dropdown -->
    <div class="flex flex-col sm:flex-row gap-3">
      <!-- Arama Inputu -->
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input
          v-model="todoStore.searchQuery"
          type="text"
          placeholder="Görev başlığı ile ara..."
          class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
        />
      </div>

      <!-- Sıralama Dropdown -->
      <div class="relative min-w-[200px]">
        <ArrowUpDown class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
        <select
          v-model="todoStore.currentSort"
          class="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition appearance-none cursor-pointer"
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

    <!-- Alt Satır: Filtre Butonları (Yatay Kaydırılabilir) -->
    <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
      <Filter class="w-3.5 h-3.5 text-slate-400 mr-1 flex-shrink-0" />
      <button
        v-for="filter in filters"
        :key="filter.value"
        @click="todoStore.currentFilter = filter.value"
        :class="[
          'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer',
          todoStore.currentFilter === filter.value
            ? 'bg-indigo-600 text-white shadow-sm'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        ]"
      >
        {{ filter.label }}
      </button>
    </div>
  </div>
</template>