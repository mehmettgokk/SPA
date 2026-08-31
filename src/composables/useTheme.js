import { ref } from 'vue'

const THEME_KEY = 'vue_todo_spa_theme'
const savedTheme = localStorage.getItem(THEME_KEY)
const isDark = ref(savedTheme === 'dark')

const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem(THEME_KEY, 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem(THEME_KEY, 'light')
  }
}

// Başlangıçta çalıştır
applyTheme()

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
  }

  return {
    isDark,
    toggleTheme
  }
}