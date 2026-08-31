import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'vue_todo_spa_tasks_v1'

export const useTodoStore = defineStore('todo', () => { // Composition API için Setup yapısı seçildi

  // 1. STATE (Ham Veriler)

  const savedTasks = localStorage.getItem(STORAGE_KEY) //backand kullanılmayacağı için 
  const tasks = ref(savedTasks ? JSON.parse(savedTasks) : [])

  // Arama, filtre ve sıralama durumları
  const searchQuery = ref('')
  const currentFilter = ref('all') 
  const currentSort = ref('custom') 
  

  // 2. WATCHER (Local Storage Otomatik Senkronizasyonu)

  watch(                // Veri kalıcılığını otomatikleştirmek için kullanıldı
    tasks,
    (newTasks) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
    },
    { deep: true } // Obje içindeki isCompleted vb. alt alanları izlemek için kullanıldı
  )

  // 3. COMPUTED: İstatistikler (Statistics)

  const stats = computed(() => {        // Ayrı bir fonksiyonda hesaplatmamak için computed'e bağlandı
    const total = tasks.value.length
    const completed = tasks.value.filter((t) => t.isCompleted).length
    const pending = total - completed
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

    return {
      total,
      completed,
      pending,
      percentage,
    }
  })

  // 4. COMPUTED: Filtrelenmiş ve Sıralanmış Görev Listesi

  const filteredTasks = computed(() => {    // İşlemler yapılırken ham veriyi bozmamak için kullanıldı.
    let result = [...tasks.value]           // Kopyalandı

    // A) Arama Filtresi (Başlıkta arama)
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      result = result.filter((task) =>
        task.title.toLowerCase().includes(query)
      )
    }

    // B) Kategori / Durum / Öncelik Filtresi
    if (currentFilter.value === 'completed') {
      result = result.filter((task) => task.isCompleted)
    } else if (currentFilter.value === 'pending') {
      result = result.filter((task) => !task.isCompleted)
    } else if (['low', 'medium', 'high'].includes(currentFilter.value)) {
      result = result.filter((task) => task.priority === currentFilter.value)
    }

    // C) Sıralama Mantığı
    const priorityWeight = { high: 3, medium: 2, low: 1 }

    if (currentSort.value !== 'custom') {
      result.sort((a, b) => {
        switch (currentSort.value) {
          case 'createdAt-desc':
            return new Date(b.createdAt) - new Date(a.createdAt)
          case 'createdAt-asc':
            return new Date(a.createdAt) - new Date(b.createdAt)
          case 'dueDate-asc':
            if (!a.dueDate) return 1
            if (!b.dueDate) return -1
            return new Date(a.dueDate) - new Date(b.dueDate)
          case 'priority-desc':
            return priorityWeight[b.priority] - priorityWeight[a.priority]
          case 'alphabet-asc':
            return a.title.localeCompare(b.title, 'tr')
          case 'alphabet-desc':
            return b.title.localeCompare(a.title, 'tr')
          default:
            return 0
        }
      })
    }

    return result
  })


  // 5. ACTIONS (Görev Yönetim Fonksiyonları)


  // Yeni Görev Ekleme
  const addTask = ({ title, description, priority, dueDate }) => {
    const newTask = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority || 'medium',
      dueDate: dueDate || null,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    }
    tasks.value.unshift(newTask)        // yeni eklenen görevin en üste gelmesi için kullanıldı (push yerine)
  }

  // Görev Güncelleme
  const updateTask = (id, updatedFields) => {
    const index = tasks.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      tasks.value[index] = {
        ...tasks.value[index],
        ...updatedFields,
      }
    }
  }

  // Görev Silme
  const deleteTask = (id) => {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  // Tamamlandı Durumu Değiştirme 
  const toggleTaskStatus = (id) => {
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      task.isCompleted = !task.isCompleted
    }
  }


  const reorderTasks = (newTasks) => {
    currentSort.value = 'custom'
    tasks.value = [...newTasks]
  }

  
  return {
    tasks,
    searchQuery,
    currentFilter,
    currentSort,
    stats,
    filteredTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    reorderTasks
  }
})