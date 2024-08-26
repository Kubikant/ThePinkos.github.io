<script setup>
defineProps(['cisloDna', 'mesiac', 'rok', 'menoDna', 'index', 'meniny', 'denVRoku', 'slnko'])
import {getGoodFriday, getEasterMonday} from 'easter-date';
</script>

<template>
  <div class="den">
    <div class="datum" :style="{ borderBottom: index === 6 ? 'white 1mm solid' : undefined }">
      {{ cisloDna }}
    </div>
    <div class="info" :style="{ borderBottom: index === 5 ? '0' : undefined }">
      <div class="menoDna">{{ menoDna }}</div>
      <div class="meniny">{{ meniny }}</div>
      <div class="denVRoku">{{ denVRoku }}</div>
      <div class="slnko"> {{ slnko }}</div>
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

  display: grid;
  grid-template-columns: 22% 68% 10%;
  grid-template-rows: 23% 52% 25%;
  max-width: 100%;
}
.menoDna {
  color: #313131;
  padding-top: 0.24em;
  padding-left: 0.2em;
  font-size: 172%;
  font-weight: 700;
}
.denVRoku {
  grid-column: 3;
  text-align: right;
  font-weight: bold;
  color: #313131;
  padding-right: 1mm;
}
.meniny {
  padding-left: 0.4em;
  font-size: 145%;
  font-weight: 350;
  font-style: italic;

  grid-row: 2;
  grid-column: 1;
}
.slnko {
  display: grid;
  grid-row: 2/4;
  grid-column: 3;
  justify-self: right;
  align-self: self-end;

  text-align: right;

  height: min-content;
  width: min-content;

  padding: 1mm;
  margin: 0 0.5mm 0.5mm 0;
  border-radius: 1mm;

  color: #000000;
  font-weight: 500;
  line-height: 4mm;
  font-size: 110%;
  background-image: linear-gradient(180deg, #c21d00 -10%, #fffb00 35% 70%, #0a2000 120%);
}
</style>
