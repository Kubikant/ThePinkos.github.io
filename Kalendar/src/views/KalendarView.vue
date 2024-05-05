<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  {{ count }}
  <button @click="count++">Count</button>
</template>

<style>
:root {
  background-color: rgb(59, 71, 71);
}
</style>
