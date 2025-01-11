<script setup>
import { ref, watch, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { calendarArray, array } from '@/assets/logika.js'
import debounce from 'lodash/debounce'

const viewKey = ref(0)
const defaultJsonContent = `{
  "narodeninyMeniny": {
    "01/01": "Ján Novák - narodeniny (1972)",
    "30/06": "Janenka Nová - meniny"
  },
  "umrtia": {
    "04/02": "Ján Novák st. - výročie úmrtia (2022)"
  },
  "vyrociaSvadby": {
    "08/02": "Ján Novák st. a Janenka Nová - výročie svadby (2000)"
  }
}`
const jsonContent = ref(localStorage.getItem('jsonContent') || defaultJsonContent)
const selectedImages = ref([])

const printView = () => {
  window.print()
}

const handleFileImport = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = JSON.parse(e.target.result)
      jsonContent.value = JSON.stringify(data, null, 2)
      calendarArray.value = array(data)
      viewKey.value++
    }
    reader.readAsText(file)
  }
}

const handleImageImport = (event) => {
  const files = Array.from(event.target.files)
  const newImages = files.map((file) => ({
    name: file.name,
    url: URL.createObjectURL(file)
  }))
  selectedImages.value = [...selectedImages.value, ...newImages]
  viewKey.value++
}

const resetToDefault = () => {
  jsonContent.value = defaultJsonContent
  calendarArray.value = array(JSON.parse(defaultJsonContent))
  viewKey.value++
}

const updateCalendarArray = debounce((newContent) => {
  try {
    const data = newContent.trim() === '' ? {} : JSON.parse(newContent)
    calendarArray.value = array(data)
    viewKey.value++
  } catch (e) {
    console.error('Invalid JSON:', e)
  }
}, 300)

const downloadJson = () => {
  const blob = new Blob([jsonContent.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'kalendar.json'
  a.click()
  URL.revokeObjectURL(url)
}

watch(jsonContent, (newContent) => {
  localStorage.setItem('jsonContent', newContent)
  updateCalendarArray(newContent)
})

onMounted(() => {
  updateCalendarArray(jsonContent.value)
})
</script>

<template>
  <div class="head">
    <h1>KALENDÁR!</h1>
    <input type="file" @change="handleFileImport" accept=".json" class="file-input" id="file-input" />
    <input type="file" @change="handleImageImport" accept="image/*" multiple class="file-input" id="image-input" />
    <div class="buttons">
      <div class="button-row">
        <label for="file-input" class="button">Vybrať JSON</label>
        <label for="image-input" class="button">Vybrať Obrázky</label>
        <button @click="resetToDefault" class="button">Resetovať JSON</button>
        <button @click="downloadJson" class="button">Stiahnuť JSON</button>
      </div>
    </div>
    
    <div class="editor">
      <textarea v-model="jsonContent" rows="10" cols="50" class="json-editor"></textarea>
    </div>
    <div class="button-row">
        <button @click="printView" class="button">Vytlačiť Kalendár</button>
    </div>
  </div>

  <main>
    <RouterView :key="viewKey" :selectedImages="selectedImages" @updateViewKey="viewKey++" />
  </main>
</template>

<style scoped>
.head {
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0;
  border: 2px solid #ccc;
}

h1 {
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 400%;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-row {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.button {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: #f0f0f0;
  border-radius: 5px;
  border: 2px solid black;
  color: black;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  font-size: 16px;
  width: 200px;
  text-align: center;
  box-sizing: border-box;
}

.button:hover {
  background-color: #e0e0e0;
}

.file-input {
  display: none;
}

.editor {
  margin: 20px auto;
  text-align: center;
}

.json-editor {
  width: 600px;
  max-width: 80%;
  height: 300px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  font-family: monospace;
  background-color: #f9f9f9;
}

.json-editor:focus {
  border-color: #007bff;
  outline: none;
}

/* Print styles */
@media print {
  body * {
    visibility: hidden;
  }
  main, main * {
    visibility: visible;
  }
  main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>