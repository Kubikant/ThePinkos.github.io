<script setup>
defineProps(['cisloDna', 'mesiac', 'rok', 'menoDna', 'index', 'meniny', 'denVRoku', 'slnko', 'naseSviatky', 'prazdniny'])
</script>
<template>
  <div class="den">
    <div class="datum" :style="{ borderBottom: index === 6 ? 'white 1mm solid' : undefined, backgroundColor: naseSviatky?.statneSviatky !== undefined ? '#e21414' : undefined }">
      {{ cisloDna }}
    </div>
    <div class="info" :style="{ borderBottom: index === 5 ? '0' : undefined }">
      <div class="menoDna">{{ menoDna }}</div>
      <div class="meniny">{{ meniny }}</div>
      <div class="denVRoku">{{ denVRoku }}</div>
      <div class="slnko">{{ slnko }}</div>
      <div class="prazdniny">{{ prazdniny }}</div>
      <div class="naseSviatky">
        <div class="statneSviatky">
          {{ naseSviatky?.statneSviatky }}
        </div>
        <div class="vyrociaSvadby">
          {{ naseSviatky?.vyrociaSvadby }}
        </div>
        <div class="umrtia">
          {{ naseSviatky?.umrtia }}
        </div>
        <div class="narodeninyMeniny">
          {{ naseSviatky?.narodeninyMeniny }}
        </div>
        <div class="medzDni">
          {{ naseSviatky?.medzDni }}
        </div>
        <div class="slnovraty">
          {{ naseSviatky?.slnovraty }}
        </div>
      </div>
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

  overflow: hidden;

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
.prazdniny {
  grid-row: 3;
  grid-column: 1/3;
  background-color: rgb(1, 168, 1);
  color: white;

  padding: 0.8mm 1.5mm;
  border-radius: 1mm;
  margin: auto 0 0.5mm 0.5mm;
  height: 1rem;
  width: max-content;
  display: block;
  clear: right;
}
.prazdniny:empty {
  display: none;
}

.naseSviatky {
  grid-row: 1/3;
  grid-column: 2;
}
.naseSviatky > * {

  padding: 0.8mm 1.5mm;
  border-radius: 1mm;
  margin-top: 0.5mm;

  max-width: 7.1cm;
  width: max-content;
  display: block;
  clear: right;
}
.naseSviatky > *:empty {
  display: none;
}

.statneSviatky {
  background-color: #e21414;
  color: white;
}
.vyrociaSvadby {
  background-color: #0070c0;
  color: white;
}
.umrtia {
  background-color: #313131;
  color: white;
}
.narodeninyMeniny {
  background-color: #fff200;
  color: #313131;
}
.medzDni {
  background-color: #d89400;
  color: white;
}
.slnovraty {
  background-color: #8d8d8d;
  color: white;
}
</style>
