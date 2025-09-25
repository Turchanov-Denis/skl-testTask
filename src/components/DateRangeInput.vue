<template>
  <div class="date-range-input">
    <input
        type="text"
        readonly
        :value="formattedValue"
        @focus="toggleCalendar"
    />
    <span class="icon" @click="toggleCalendar">📅</span>

    <div v-if="isOpen" class="popup">
      <CalendarPicker
          @cancel="closeCalendar"
          @save="setDates"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import CalendarPicker from "./CalendarPicker.vue"

const isOpen = ref(false)
const startDate = ref(null)
const endDate = ref(null)

const formattedValue = computed(() => {
  if (!startDate.value || !endDate.value) return ""
  return `${formatDate(startDate.value)} - ${formatDate(endDate.value)}`
})

function formatDate(date) {
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  })
}

function toggleCalendar() {
  isOpen.value = !isOpen.value
}

function closeCalendar() {
  isOpen.value = false
}

function setDates({ start, end }) {
  startDate.value = start
  endDate.value = end
  closeCalendar()
}
</script>

<style lang="scss" scoped>
.date-range-input {
  width: 100%;
  position: relative;
  display: inline-flex;
  align-items: center;

  input {
    width: 100%;
    padding: 8px 32px 8px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    min-width: 240px;
    cursor: pointer;
    background: #fff;
    height: 54px;
  }

  .icon {
    position: absolute;
    right: 8px;
    cursor: pointer;
  }

  .popup {
    position: absolute;
    top: 110%;
    left: 0;
    z-index: 1000;
  }
}
</style>
