<script setup>
defineProps(['cisloDna', 'mesiac', 'rok', 'menoDna'])
</script>

<template>
  <div class="den">
    <h1>{{ cisloDna }}. {{ mesiac }} {{ rok }}</h1>
    <p>{{ menoDna }}</p>
  </div>
</template>

<style>
h1 {
  font-size: 5mm;
  padding: 0;
}

.den {
  height: 3cm;
  width: 13cm;
  margin: 3mm 0 3mm 0;

  background-color: rgb(218, 219, 219);
}
</style>
