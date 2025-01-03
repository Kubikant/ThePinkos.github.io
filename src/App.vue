<script setup>
import { ref, watch, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { calendarArray, array } from '@/assets/logika.js'
import debounce from 'lodash/debounce'

const route = useRoute()
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
    <button v-if="route.path !== '/'" @click="printView">Vytlač</button>
    <input type="file" @change="handleFileImport" accept=".json" class="file-input" id="file-input" />
    <label for="file-input" class="custom-file-input">Vyberte JSON súbor</label>
    <button @click="resetToDefault" class="custom-file-input">Resetovať JSON</button>
    <div class="editor">
      <textarea v-model="jsonContent" rows="10" cols="50" class="json-editor"></textarea>
    </div>
  </div>

  <main>
    <RouterView :key="viewKey" />
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

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

.file-input {
  display: none;
}

.custom-file-input {
  display: inline-block;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  border: 2px solid black;
  border-radius: 5px;
  background-color: #f0f0f0;
  font-size: 16px;
  color: black;
}

.custom-file-input:hover {
  background-color: #e0e0e0;
}

.editor {
  margin: 20px auto;
  text-align: center;
}

.json-editor {
  width: 80%;
  max-width: 800px;
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