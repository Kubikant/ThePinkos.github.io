<script setup>
import stranaComponent from '@/components/stranaComponent.vue'
</script>

<template>
  <div class="kalendar">
    <stranaComponent />
  </div>
</template>

<style>
.kalendar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 297mm;

  margin: 0 auto;
}
</style>
