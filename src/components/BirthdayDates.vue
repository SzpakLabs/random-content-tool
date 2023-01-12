<template>
  <h1>Random Birthday Dates</h1>
  <div class="controls">
    <div>
      <label for="format">Format</label>
      <select
        class="controls__item"
        name="format"
        v-model="formatValue"
        @change="generateDates"
      >
        <option
          v-for="(formatOption, index) in formatOptions"
          :key="index"
          :value="formatOption"
        >
          {{ formatOption }}
        </option>
      </select>
    </div>
    <div>
      <label for="quantity">Quantity</label>
      <input
        class="controls__item"
        name="quantity"
        type="number"
        v-model="datesLength"
        @change="generateDates"
      />
    </div>
    <button class="controls__item" @click="generateDates">Regenerate</button>
  </div>
  <div class="results">
    <div
      class="value"
      :class="{
        done: index === copied,
      }"
      v-for="(date, index) in dates"
      :key="index"
      @click="copyDate(date, index)"
    >
      {{ date }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import format from 'date-fns/format'

const formatValue = ref('dd-MM-yyyy')
const formatOptions = ref([
  'dd-MM-yyyy',
  'MM-dd-yyyy',
  'yyyy-MM-dd',
  'dd, MMMM yyyy',
  'MMMM dd yyyy, h:mm:ss a',
])
const dates = ref<string[] | never[]>([])
const datesLength = ref(10)
const copied = ref<number>(NaN)
const generateDates = () => {
  const minAge = 24
  const maxAge = 64
  const minDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - maxAge),
  )
  const maxDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - minAge),
  )
  dates.value = Array.from({ length: datesLength.value }, () => {
    const randomDate = new Date(
      minDate.getTime() +
        Math.random() * (maxDate.getTime() - minDate.getTime()),
    )
    //using date-fns library
    return format(randomDate, formatValue.value)
  })
}

const copyDate = (date: string, index: number) => {
  copied.value = index
  navigator.clipboard.writeText(date)

  setTimeout(() => {
    copied.value = NaN
  }, 3000)
}
onMounted(() => {
  generateDates()
})
</script>

<style lang="scss">
label {
  margin-right: 0.5rem;
}
button {
  background-color: lightgreen;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  max-width: 300px;

  &__item {
    width: 100%;
    margin-bottom: 1rem;
  }
}
.value {
  cursor: pointer;
}
.done {
  color: lightgreen;
}
.results {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
