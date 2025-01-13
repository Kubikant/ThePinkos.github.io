<script setup>
import { ref, watch, defineEmits } from 'vue'
import { calendarArray } from '@/assets/logika.js'
import denComponent from './stranaComponents/denComponent.vue'
import fotkaComponent from './stranaComponents/fotkaComponent.vue'

const days = ref(calendarArray)
const props = defineProps(['selectedImages', 'viewKey'])
const emit = defineEmits(['updateViewKey'])

watch(() => props.selectedImages, (newImages) => {
  console.log('Selected images updated:', newImages)
  emit('updateViewKey') // Emit the event to update the viewKey
})
</script>

<template>
  <!-- Uvodna strana -->
  <div class="strana uvodna">{{ days[20].year }}</div>

  <!-- Rozdel strany na 7 dni -->
  <div
    class="strana"
    v-for="strana in Math.ceil(days.length / 7)"
    :key="strana"
    :style="{
      gridColumn: strana <= 27 ? 1 : 2,
      gridRow: strana <= 27 ? strana + 1 : strana - 27
    }"
  >
    <!-- Fotka -->
    <fotkaComponent :uniqueKey="strana.toString()" :image="props.selectedImages.find(img => img.name === `${strana}.jpg`)?.url || '/default.jpeg'" :viewKey="props.viewKey" @updateViewKey="emit('updateViewKey')" />

    <!-- Informacie o tyzdni -->
    <div class="tyzden_info">
      <div class="mesiacARok">
        {{ days[(strana - 1) * 7].month }} {{ days[(strana - 1) * 7].year }}
      </div>
      <div class="cisloTyzdna">{{ days[(strana - 1) * 7].week }}. Hét</div>
    </div>
    <!-- Dni -->
    <denComponent
      v-for="(day, index) in days.slice(strana * 7 - 7, strana * 7)"
      :key="index"
      :cisloDna="day.date"
      :mesiac="day.month"
      :rok="day.year"
      :denVRoku="day.dayNumber"
      :menoDna="day.dayName"
      :slnko="day.sun"
      :fazyMesiaca="day.moonPhase"
      :meniny="day.nameDay"
      :naseSviatky="day.naseSviatky"
      :sviatky="day.data"
      :prazdniny="day.holidays"
      :class="{ vikend: index === 5 || index === 6 }"
      :index="index"
    />

    <!-- Poznamky -->
    <div class="poznamky">
      <img src="@/assets/pero.svg" alt="Mala by tu byt fotka" />
    </div>
  </div>
</template>

<style>
.uvodna {
  font-family: system-ui;
  display: grid;
  justify-content: center;
  align-items: center;
  font-size: 400%;
  font-weight: bold;

  border-right: 1px dotted #b4b4b4;
}

.strana {
  background-color: white;

  font-family: system-ui;

  padding: 20mm 10mm 0 10mm;
  max-width: 148.5mm;
  height: 39cm;

  page-break-after: always;
}

.tyzden_info {
  font-size: 0.5cm;
  color: white;

  font-weight: bold;
  letter-spacing: 0.3mm;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 0.3cm;
  margin-bottom: 0.3cm;
  padding-top: 4.5mm;
  border-top: 0.6mm dashed #b4b4b4;

  text-align: center;
}

.tyzden_info .mesiacARok {
  background-color: #051650;
  padding: 0.3mm 10mm 0.6mm 10mm;
  border-radius: 1mm;
  min-width: 5.5cm;
}
.tyzden_info .cisloTyzdna {
  background-color: #051650;
  padding: 0.3mm 2mm 0.6mm 2mm;
  border-radius: 1mm;
  min-width: 3cm;
}

.poznamky {
  margin-top: 3mm;
  border-top: 0.6mm dashed #b4b4b4;
}
.poznamky img {
  width: 6mm;
  margin: 1.5mm;
  opacity: 0.5;
}
</style>