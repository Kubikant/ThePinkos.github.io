<script setup>
import { ref } from 'vue'
import { calendarArray } from '@/assets/logika.js'
import denComponent from './stranaComponents/denComponent.vue'

const days = ref(calendarArray)
</script>

<template>
  <p>{{ calendarArray[1] }}</p>
  <denComponent
    v-for="day in days"
    :key="day.id"
    :cisloDna="day.date"
    :mesiac="day.month"
    :rok="day.year"
    :menoDna="day.dayName"
  />
</template>
