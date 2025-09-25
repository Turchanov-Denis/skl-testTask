<template>
  <div class="calendar">
    <div class="calendar__title">Выбрать период</div>
    <div class="calendar__line"></div>
    <div class="calendar__header">
      <button @click="prevMonth">‹</button>
      <span>{{ monthName }} {{ currentYear }}</span>
      <button @click="nextMonth">›</button>
    </div>

    <div class="calendar__weekdays">
      <span v-for="day in weekdays" :key="day">{{ day }}</span>
    </div>

    <div class="calendar__days">
      <span
          v-for="(day, index) in daysInCalendar"
          :key="index"
          :class="dayClasses(day)"
          @click="selectDate(day)"
      >
        {{ day.date }}
      </span>
    </div>

    <div class="calendar__actions">
      <button class="btn cancel" @click="$emit('cancel')">Отмена</button>
      <button class="btn save" @click="saveSelection">Сохранить</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

const emit = defineEmits(["cancel", "save"])

const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())
const startDate = ref(null)
const endDate = ref(null)

const weekdays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]

// названия месяцев
const monthNames = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
]

const monthName = computed(() => monthNames[currentMonth.value])

// получаем список дней для календаря
const daysInCalendar = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)

  const days = []

  // пустые ячейки перед началом месяца
  for (let i = 1; i < (firstDay.getDay() || 7); i++) {
    days.push({ date: "", disabled: true })
  }

  // дни месяца
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(currentYear.value, currentMonth.value, d)
    days.push({
      date: d,
      timestamp: date.getTime()
    })
  }

  return days
})

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function selectDate(day) {
  if (!day.timestamp) return

  if (!startDate.value || (startDate.value && endDate.value)) {
    startDate.value = day.timestamp
    endDate.value = null
  } else if (day.timestamp < startDate.value) {
    endDate.value = startDate.value
    startDate.value = day.timestamp
  } else {
    endDate.value = day.timestamp
  }
}

function dayClasses(day) {
  if (!day.timestamp) return "empty"

  const ts = day.timestamp
  const isStart = ts === startDate.value
  const isEnd = ts === endDate.value
  const inRange =
      startDate.value && endDate.value && ts > startDate.value && ts < endDate.value

  return {
    selected: isStart || isEnd,
    range: inRange,
    start: isStart,
    end: isEnd
  }
}

function saveSelection() {
  if (startDate.value && endDate.value) {
    emit("save", {
      start: new Date(startDate.value),
      end: new Date(endDate.value)
    })
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  width: 364px;
  height: 482px;
  background: #fdfdfd;
  color: #070707;
  border-radius: 12px;
  padding: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  text-align: center;
  color: #93939b;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  &__title{
    font-weight: 700;
    font-size: 20px;
    line-height: 140%;
    color: #111827;
  }
  &__line{
    background: #d3d3de;
    height: 1px;
    margin: 10px 0;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    span {
      font-weight: 600;
      font-size: 16px;
      line-height: 150%;
      letter-spacing: 0.02em;
      text-align: center;
      color: #111827;
    }

    button {
      background: none;
      width: 15px;
      height: 15px;
      font-size: 20px;
      cursor: pointer;
    }
  }

  &__weekdays, &__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
  }

  &__weekdays {
    font-weight: bold;
    margin-bottom: 8px;
  }

  &__days span {
    padding: 12px;
    border-radius: 6px;
    margin: 2px;
    cursor: pointer;
    transition: background 0.2s;

    &.empty {
      cursor: default;
      background: none;
    }

    &.selected {
      background: #2ecc71;
    }

    &.range {
      background: #c1fad0;
    }

    &.start {
      border-radius: 20px 6px 6px 20px;
    }

    &.end {
      border-radius: 6px 20px 20px 6px;
    }

    &:hover:not(.empty) {
      background: #444;
    }
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;

    .btn {
      border-radius: 10px;
      padding: 16px 24px;
      width: 148px;
      height: 53px;
    }

    .cancel {
      border: 1px solid #55555c;
      border-radius: 10px;
      padding: 16px 24px;
      width: 148px;
      height: 53px;
    }

    .save {
      background: #0e0e10;
      color: #fff;
    }
  }
}
</style>
