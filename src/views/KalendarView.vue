<script setup>
import { defineProps } from 'vue'
import stranaComponent from '@/components/stranaComponent.vue'

const props = defineProps(['selectedImages'])
</script>

<template>
  <div class="kalendar">
    <stranaComponent :selectedImages="props.selectedImages" />
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
