<template>
  <div id="mainfull">
    <input type="number" id="vyskaDna" v-model="height" />
    <div class="dvojstrana" v-for="dvojstrana in 28" :key="dvojstrana">
      <div class="strana uvodna lavastrana" v-if="dvojstrana === 1">Rok {{ generate[7].at(10) }}</div>

      <div class="strana lavastrana" v-if="dvojstrana !== 1">
        <!-- FOTKA -->
        <img class="fotka" :src="`/fotky/` + (dvojstrana - 1) + `.jpg`" alt="fotka" />

        <!-- TYZDEN -->
        <div class="tyzden">
          <div class="tyzden_info">
            <div class="div1">{{ generate[5].at(dvojstrana - 1 - 1) }} {{ generate[7].at(dvojstrana - 1 - 1) }}</div>
            <div class="div2">{{ generate[3].at((dvojstrana - 1 - 1) * 7) }}. týždeň</div>
          </div>

          <!-- DEN -->
          <div class="den" :class="{ vikend: den === 6 || den === 7 }" v-for="den in 7" :key="den" :style="{ height: `${height}cm` }">
            <!-- DATUM CAST -->
            <div class="datum" :style="{ borderBottom: den === 7 ? '1mm white solid' : undefined, backgroundColor: generate[8].at(den - 7 + (dvojstrana - 1) * 7 - 1) !== undefined ? '#e21414' : undefined }">
              {{ generate[0].at(den - 7 + (dvojstrana - 1) * 7 - 1) }}
            </div>

            <!-- INFO CAST -->
            <div class="info" :style="{ borderBottom: den === 6 ? '0' : undefined }">
              <div class="menoDna">{{ generate[1].at(den - 7 + (dvojstrana - 1) * 7 - 1) }}</div>

              <!-- SVIATKY, NARODENINY, MENINY, ATD. -->
              <div class="dianie">
                <div class="sviatky">
                  {{ generate[8].at(den - 7 + (dvojstrana - 1) * 7 - 1) }}
                </div>
                <div class="vyrociaSvadby">
                  {{ generate[9].at(den - 7 + (dvojstrana - 1) * 7 - 1) }}
                </div>
                <div class="vyrociaUmrtia">
                  {{ generate[10].at(den - 7 + (dvojstrana - 1) * 7 - 1) }}
                </div>
                <div class="mena">
                  {{ generate[11].at(den - 7 + (dvojstrana - 1) * 7 - 1) }}
                </div>
                <div class="medzDni">
                  {{ generate[13].at(den - 7 + (dvojstrana - 1) * 7 - 1) }}
                </div>
                <div class="slnovraty">
                  {{ generate[14].at(den - 7 + (dvojstrana - 1) * 7 - 1) }}
                </div>
              </div>

              <!-- MENINY V TEN DEN -->
              <div class="meniny">{{ generate[6].at(den - 7 + (dvojstrana - 1) * 7 - 1) }}</div>

              <!-- CISLO DNA V ROKU -->
              <div class="denVRoku">{{ generate[2].at(den - 7 + (dvojstrana - 1) * 7 - 1) }}</div>

              <!-- PRAZDNINY -->
              <div class="prazdniny">{{ generate[12].at(den - 7 + (dvojstrana - 1) * 7 - 1) }}</div>

              <!-- SLNKO -->
              <div class="slnko">{{ generate[4].at(den - 7 + (dvojstrana - 1) * 7 - 1) }}</div>
            </div>
          </div>

          <!-- POZNAMKY -->
          <div class="poznamky"><img src="../assets/pero.svg" alt="" /></div>
        </div>
      </div>
      <div class="strana pravaStrana">
        <!-- FOTKA -->
        <img class="fotka" :src="`../fotky/` + (dvojstrana + 27) + `.jpg`" alt="fotka" />

        <!-- TYZDEN -->
        <div class="tyzden">
          <div class="tyzden_info">
            <div class="div1">{{ generate[5].at(dvojstrana - 1 + 27) }} {{ generate[7].at(dvojstrana - 1 + 27) }}</div>
            <div class="div2">{{ generate[3].at((dvojstrana - 1 + 27) * 7) }}. týždeň</div>
          </div>

          <!-- DEN -->
          <div class="den" :class="{ vikend: den === 6 || den === 7 }" v-for="den in 7" :key="den" :style="{ height: `${height}cm` }">
            <!-- DATUM CAST -->
            <div class="datum" :style="{ borderBottom: den === 7 ? '1mm white solid' : undefined, backgroundColor: generate[8].at(den - 7 + (dvojstrana + 27) * 7 - 1) !== undefined ? '#e21414' : undefined }">
              {{ generate[0].at(den - 7 + (dvojstrana + 27) * 7 - 1) }}
            </div>

            <!-- INFO CAST -->
            <div class="info" :style="{ borderBottom: den === 6 ? '0' : undefined }">
              <div class="menoDna">{{ generate[1].at(den - 7 + (dvojstrana + 27) * 7 - 1) }}</div>

              <!-- SVIATKY, NARODENINY, MENINY, ATD. -->
              <div class="dianie">
                <div class="sviatky">
                  {{ generate[8].at(den - 7 + (dvojstrana + 27) * 7 - 1) }}
                </div>
                <div class="vyrociaSvadby">
                  {{ generate[9].at(den - 7 + (dvojstrana + 27) * 7 - 1) }}
                </div>
                <div class="vyrociaUmrtia">
                  {{ generate[10].at(den - 7 + (dvojstrana + 27) * 7 - 1) }}
                </div>
                <div class="mena">
                  {{ generate[11].at(den - 7 + (dvojstrana + 27) * 7 - 1) }}
                </div>
                <div class="medzDni">
                  {{ generate[13].at(den - 7 + (dvojstrana + 27) * 7 - 1) }}
                </div>
                <div class="slnovraty">
                  {{ generate[14].at(den - 7 + (dvojstrana + 27) * 7 - 1) }}
                </div>
              </div>

              <!-- MENINY V TEN DEN -->
              <div class="meniny">{{ generate[6].at(den - 7 + (dvojstrana + 27) * 7 - 1) }}</div>

              <!-- CISLO DNA V ROKU -->
              <div class="denVRoku">{{ generate[2].at(den - 7 + (dvojstrana + 27) * 7 - 1) }}</div>

              <!-- PRAZDNINY -->
              <div class="prazdniny">{{ generate[12].at(den - 7 + (dvojstrana + 27) * 7 - 1) }}</div>

              <!-- SLNKO -->
              <div class="slnko">{{ generate[4].at(den - 7 + (dvojstrana + 27) * 7 - 1) }}</div>
            </div>
          </div>

          <!-- POZNAMKY -->
          <div class="poznamky"><img src="../assets/pero.svg" alt="" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { kalendar } from './InfoTyzden.js'

export default {
  computed: {
    //zisti rok a vygeneruje podla toho kalendar
    generate() {
      return kalendar(this.id)
    }
  },
  data() {
    return {
      height: 3
    }
  },
  props: ['id']
}
</script>

<style scoped>
/* CAST dvojstrana */

#mainfull {
  display: grid;
  justify-content: center;
}

.dvojstrana {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 297mm;
}

.uvodna {
  font-family: system-ui;
  display: grid;
  justify-content: center;
  align-items: center;
  font-size: 400%;
  font-weight: bold;
}

.strana {
  background-color: white;

  font-family: system-ui;

  padding: 20mm 10mm 0 10mm;

  height: 40cm;
}
.lavastrana {
  border-right: 0.2mm dashed #b4b4b4;
}
.pravaStrana {
  border-left: 0.2mm dashed #b4b4b4;
}

/* CAST MESIAC INFO */
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
.tyzden_info .div1 {
  background-color: #051650;
  padding: 0.3mm 10mm 0.6mm 10mm;
  border-radius: 0.7mm;
  min-width: 5.5cm;
}
.tyzden_info .div2 {
  background-color: #051650;
  padding: 0.3mm 2mm 0.6mm 2mm;
  border-radius: 0.7mm;
  min-width: 3cm;
}

/* CAST TYZDEN */
.tyzden {
  margin: 0 auto;
  display: grid;
}

.den {
  display: grid;
  grid-template-columns: 12% calc(88%);
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
.vikend .datum {
  background-color: #00b050;
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
.meniny {
  padding-left: 0.4em;
  font-size: 145%;
  font-weight: 350;
  font-style: italic;

  grid-row: 2;
  grid-column: 1;
}
.denVRoku {
  grid-column: 3;
  text-align: right;
  font-weight: bold;
  color: #313131;
  padding-right: 1mm;
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

.dianie > * {
  grid-row: 1/2;

  padding: 0.8mm 1.5mm;
  border-radius: 1mm;
  margin-top: 0.5mm;

  max-width: 7.1cm;
  width: max-content;
  display: block;
  clear: right;
}
.dianie > *:empty {
  display: none;
}

.sviatky {
  background-color: #e21414;
  color: white;
}
.vyrociaSvadby {
  background-color: #0070c0;
  color: #fff200;
}
.vyrociaUmrtia {
  background-color: #313131;
  color: white;
}
.medzDni {
  background-color: #d89400;
  color: white;
}
.slnovraty {
  background-color: #8d8d8d;
  color: white;
}

.mena {
  background-color: #fff200;
  color: #313131;
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

.vikend .info {
  border-bottom: 1mm solid #00b050;
  border-top: 1mm solid #00b050;
  border-right: 1mm solid #00b050;
  background-color: #e2efda;
}

/* CAST FOTKA */
.fotka {
  aspect-ratio: 4/3;
  object-fit: cover;
  width: 100%;
  max-width: 15cm;
  border-radius: 1mm;
}

/* CAST POZNAMKY */
.poznamky {
  margin-top: 3mm;
  border-top: 0.6mm dashed #b4b4b4;
}
.poznamky img {
  width: 6mm;
  margin: 1.5mm;
  opacity: 0.5;
}

@media print {
  .dvojstrana {
    page-break-after: always;
    width: auto;
  }
  input {
    display: none;
  }
}
</style>
