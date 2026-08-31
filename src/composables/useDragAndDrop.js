import { ref } from 'vue'

export function useDragAndDrop() {
  const draggedIndex = ref(null)

  const handleDragStart = (index, event) => {
    draggedIndex.value = index
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('text/plain', index.toString())
    }
  }

  const handleDragEnd = () => {
    draggedIndex.value = null
  }

  const handleDrop = (targetIndex, list, onReorder) => {
    if (draggedIndex.value === null || draggedIndex.value === undefined) return
    if (draggedIndex.value === targetIndex) return

    const updatedList = [...list]
    const [movedItem] = updatedList.splice(draggedIndex.value, 1)
    updatedList.splice(targetIndex, 0, movedItem)

    draggedIndex.value = null

    if (onReorder) {
      onReorder(updatedList)
    }
  }

  return {
    draggedIndex,
    handleDragStart,
    handleDragEnd,
    handleDrop
  }
}