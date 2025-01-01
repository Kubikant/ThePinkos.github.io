<template>
  <div id="app">
    <h2>Add Item</h2>
    <div class="form">
      <input v-model="newItem.name" placeholder="Enter name" />
      <input v-model="newItem.date" type="text" placeholder="dd/mm/yyyy" @input="formatDate" />
      <button @click="addItem">Add Item</button>
    </div>

    <h2>Item List</h2>
    <div v-for="(item, index) in items" :key="index" class="list-item">
      <div v-if="editIndex === index">
        <input v-model="editItem.name" placeholder="Enter name" />
        <input v-model="editItem.date" type="date" />
        <button @click="saveItem(index)">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
      <div v-else>
        <p><strong>Name:</strong> {{ item.name }}</p>
        <p><strong>Date:</strong> {{ item.date }}</p>
        <button @click="editItemDetails(index)">Edit</button>
        <button @click="deleteItem(index)">Delete</button>
      </div>
    </div>

    <button @click="downloadItems">Download Items as JSON</button>
    <input type="file" @change="importItems" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const newItem = ref({ name: '', date: '' })
    const items = ref([])
    const editIndex = ref(null)
    const editItem = ref({ name: '', date: '' })

    const saveToLocalStorage = () => localStorage.setItem('items', JSON.stringify(items.value))
    const loadFromLocalStorage = () => {
      const savedItems = localStorage.getItem('items')
      if (savedItems) items.value = JSON.parse(savedItems)
    }

    const addItem = () => {
      if (newItem.value.name && newItem.value.date) {
        items.value.push({ ...newItem.value })
        newItem.value.name = ''
        newItem.value.date = ''
        saveToLocalStorage()
      }
    }

    const editItemDetails = (index) => {
      editIndex.value = index
      editItem.value = { ...items.value[index] }
    }

    const saveItem = (index) => {
      items.value[index] = { ...editItem.value }
      editIndex.value = null
      saveToLocalStorage()
    }

    const cancelEdit = () => (editIndex.value = null)
    const deleteItem = (index) => {
      items.value.splice(index, 1)
      saveToLocalStorage()
    }

    const downloadItems = () => {
      const dataStr =
        'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items.value))
      const downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute('href', dataStr)
      downloadAnchorNode.setAttribute('download', 'items.json')
      document.body.appendChild(downloadAnchorNode)
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    }

    const importItems = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            items.value = JSON.parse(e.target.result)
            saveToLocalStorage()
          } catch (error) {
            console.error('Error parsing JSON file:', error)
          }
        }
        reader.readAsText(file)
      }
    }

    onMounted(loadFromLocalStorage)

    return {
      newItem,
      items,
      editIndex,
      editItem,
      addItem,
      editItemDetails,
      saveItem,
      cancelEdit,
      deleteItem,
      downloadItems,
      importItems
    }
  }
}
</script>

<style scoped>
.form {
  margin-bottom: 20px;
}
.form input {
  margin-right: 10px;
}
.list-item {
  margin-bottom: 10px;
}
</style>
