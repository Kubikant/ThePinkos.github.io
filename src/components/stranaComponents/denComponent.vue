<script setup>
defineProps(['cisloDna', 'mesiac', 'rok', 'menoDna', 'index', 'meniny'])
</script>

<template>
  <div class="den">
    <div class="datum" :style="{ borderBottom: index === 6 ? 'white 1mm solid' : undefined }">
      {{ cisloDna }}
    </div>
    <div class="info" :style="{ borderBottom: index === 5 ? '0' : undefined }">
      {{ menoDna }} -- {{ meniny }}
    </div>
  </div>
</template>

<style>
.den {
  display: grid;
  grid-template-columns: 12% calc(88%);
  height: 2.6cm;
}

.vikend .info {
  border-bottom: 1mm solid #00b050;
  border-top: 1mm solid #00b050;
  border-right: 1mm solid #00b050;
  background-color: #e2efda;
}

.vikend .datum {
  background-color: #00b050;
  border-top: 1mm solid white;
}

.datum {
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #0070c0;
  border-top: 1mm solid white;

  font-size: 230%;
  font-family: system-ui;
  font-weight: bold;
  color: white;

  text-align: center;
}

.info {
  border-top: 1mm solid rgb(38, 74, 194);
  border-right: 1mm solid rgb(38, 74, 194);

  font-size: 65%;
  line-height: 4mm;
}
</style>
