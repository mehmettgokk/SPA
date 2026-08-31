<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import StatisticsCards from '../components/StatisticsCards.vue'
import TodoFilterBar from '../components/TodoFilterBar.vue'
import TodoList from '../components/TodoList.vue'
import TodoFormModal from '../components/TodoFormModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'
import { Plus } from 'lucide-vue-next'
import { useToast } from '../composables/useToast'

const todoStore = useTodoStore()

const { showToast } = useToast()

// Modal Durumları
const isFormOpen = ref(false)
const editingTask = ref(null)
const isConfirmOpen = ref(false)
const taskToDeleteId = ref(null)

// Yeni Görev Modalı Aç
const openCreateModal = () => {
  editingTask.value = null
  isFormOpen.value = true
}

// Düzenleme Modalı Aç
const openEditModal = (task) => {
  editingTask.value = task
  isFormOpen.value = true
}

// Silme Onay Modalı Aç
const requestDelete = (id) => {
  taskToDeleteId.value = id
  isConfirmOpen.value = true
}

// Silmeyi Onayla
const confirmDelete = () => {
  if (taskToDeleteId.value) {
    todoStore.deleteTask(taskToDeleteId.value)
    taskToDeleteId.value = null
    showToast('Görev başarıyla silindi.', 'error')
  }
  isConfirmOpen.value = false
}

// Form Kaydetme (Hem Yeni Hem Güncelleme)
const handleSaveTask = (taskData) => {
  if (taskData.id) {
    todoStore.updateTask(taskData.id, taskData)
    showToast('Görev güncellendi.', 'info')
  } else {
    todoStore.addTask(taskData)
    showToast('Yeni görev oluşturuldu.', 'success')
  }
}

const handleToggleTask = (id) => {
  const task = todoStore.tasks.find((t) => t.id === id)
  if (task) {
    const willBeCompleted = !task.isCompleted
    todoStore.toggleTaskStatus(id)
    if (willBeCompleted) {
      showToast(`"${task.title}" tamamlandı olarak işaretlendi.`, 'success')
    } else {
      showToast(`"${task.title}" bekleyenlere alındı.`, 'info')
    }
  }
}

</script>

<template>
  <main class="max-w-4xl mx-auto px-4 py-8">
    <!-- Üst Başlık ve Yeni Görev Ekle Butonu -->
    <header class="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          TaskFlow SPA
        </h1>
        <p class="mt-1 text-sm text-slate-500">
          Local Storage destekli modern görev yönetim uygulaması
        </p>
      </div>

      <button
        @click="openCreateModal"
        class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition cursor-pointer text-sm"
      >
        <Plus class="w-4 h-4" /> Yeni Görev Ekle
      </button>
    </header>

    <!-- İstatistik Kartları -->
    <StatisticsCards />

    <!-- Arama, Filtreleme ve Sıralama Çubuğu -->
    <TodoFilterBar />

    <!-- Görev Listesi -->
    <TodoList
      @toggle-task="handleToggleTask"
      @open-edit="openEditModal"
      @request-delete="requestDelete"
    />

    <!-- Görev Ekleme/Düzenleme Modalı -->
    <TodoFormModal
      :is-open="isFormOpen"
      :editing-task="editingTask"
      @close="isFormOpen = false"
      @save="handleSaveTask"
    />

    <!-- Silme Onay Modalı -->
    <ConfirmModal
      :is-open="isConfirmOpen"
      @cancel="isConfirmOpen = false"
      @confirm="confirmDelete"
    />
  </main>
</template>