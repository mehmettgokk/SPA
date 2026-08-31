<script setup>
import { RouterView } from 'vue-router'
import ToastContainer from './components/ToastContainer.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 antialiased py-8">
    <RouterView />
    <ToastContainer />
  </div>
</template>