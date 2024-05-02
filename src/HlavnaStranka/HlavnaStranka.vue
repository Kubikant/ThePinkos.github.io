<template>
  <div>
    <h1>Kalendar</h1>

    <label for="year">Pre aky rok?</label>
    <br />
    <input type="number" v-model="selectedYear" id="year" min="1950" required @keyup.enter="getYear" ref="yearInput" />
    <br />
    <br />
    <button @click="getYear">Get Year Value</button>
  </div>
</template>

<script>
// Import functions from external JavaScript files
import { getYearValue } from './yearInput.js'

export default {
  methods: {
    getYear() {
      // Update the selectedYear with the value obtained from your function
      this.selectedYear = getYearValue()

      // You can also navigate programmatically after obtaining the year value
      this.$router.push({ path: `/kalendar/${this.selectedYear}` })
    }
  },
  mounted() {
    // Focus on the input field when the component is mounted
    this.$refs.yearInput.focus()
  }
}
</script>

<style></style>
