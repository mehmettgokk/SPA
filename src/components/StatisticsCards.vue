<script setup>
import { useTodoStore } from '../stores/todoStore'
import { CheckCircle2, Clock, ListTodo, Percent } from 'lucide-vue-next'

const todoStore = useTodoStore()
</script>

<template>
  <section class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
    <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3 transition-colors">
      <div class="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
        <ListTodo class="w-5 h-5" />
      </div>
      <div>
        <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Toplam</p>
        <p class="text-xl font-bold text-slate-900 dark:text-white">{{ todoStore.stats.total }}</p>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3 transition-colors">
      <div class="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 class="w-5 h-5" />
      </div>
      <div>
        <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Tamamlanan</p>
        <p class="text-xl font-bold text-emerald-600 dark:text-emerald-400">{{ todoStore.stats.completed }}</p>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3 transition-colors">
      <div class="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
        <Clock class="w-5 h-5" />
      </div>
      <div>
        <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Bekleyen</p>
        <p class="text-xl font-bold text-amber-600 dark:text-amber-400">{{ todoStore.stats.pending }}</p>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-center transition-colors">
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Percent class="w-3.5 h-3.5" /> İlerleme
        </span>
        <span class="text-xs font-bold text-slate-700 dark:text-slate-300">%{{ todoStore.stats.percentage }}</span>
      </div>
      <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <div 
          class="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
          :style="{ width: `${todoStore.stats.percentage}%` }"
        ></div>
      </div>
    </div>
  </section>
</template>