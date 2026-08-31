<script setup>
import { useTodoStore } from '../stores/todoStore'
import { CheckCircle2, Clock, ListTodo, Percent } from 'lucide-vue-next'

const todoStore = useTodoStore()
</script>

<template>
  <section class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
    <!-- Toplam Görev -->
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
      <div class="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
        <ListTodo class="w-5 h-5" />
      </div>
      <div>
        <p class="text-xs font-medium text-slate-500">Toplam</p>
        <p class="text-xl font-bold text-slate-900">{{ todoStore.stats.total }}</p>
      </div>
    </div>

    <!-- Tamamlanan Görev -->
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
      <div class="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
        <CheckCircle2 class="w-5 h-5" />
      </div>
      <div>
        <p class="text-xs font-medium text-slate-500">Tamamlanan</p>
        <p class="text-xl font-bold text-emerald-600">{{ todoStore.stats.completed }}</p>
      </div>
    </div>

    <!-- Bekleyen Görev -->
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
      <div class="p-2.5 rounded-lg bg-amber-50 text-amber-600">
        <Clock class="w-5 h-5" />
      </div>
      <div>
        <p class="text-xs font-medium text-slate-500">Bekleyen</p>
        <p class="text-xl font-bold text-amber-600">{{ todoStore.stats.pending }}</p>
      </div>
    </div>

    <!-- Tamamlanma Yüzdesi -->
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-xs font-medium text-slate-500 flex items-center gap-1">
          <Percent class="w-3.5 h-3.5" /> İlerleme
        </span>
        <span class="text-xs font-bold text-slate-700">%{{ todoStore.stats.percentage }}</span>
      </div>
      <!-- Dinamik Progress Bar -->
      <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div 
          class="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
          :style="{ width: `${todoStore.stats.percentage}%` }"      
        ></div>
      </div>
    </div>
  </section>
</template>