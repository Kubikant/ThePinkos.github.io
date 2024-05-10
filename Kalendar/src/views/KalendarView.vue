<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  {{ count }}
  <button @click="count++">Count</button>
</template>

<style>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

:root {
  background-color: rgb(255, 255, 255);
}
</style>
