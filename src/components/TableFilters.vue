<script setup>
// TODO: data component for select +
// TODO: add filing option from arr
// TODO: filter logic
import SelectComponent from "@/components/SelectComponent.vue";
import DateRangeInput from "@/components/DateRangeInput.vue";
</script>

<template>
  <div class="table-filter">
    <div class="table-filter__item">
      <DateRangeInput/>
    </div>
    <div class="table-filter__item">
      <SelectComponent class="table-filter__item"/>
    </div>
    <div class="table-filter__item">
      <SelectComponent class="table-filter__item"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Глубокий селектор для переопределения */
:deep(.dp__input_icon) {
  inset-inline-start: auto; /* Сброс левой позиции */
  inset-inline-end: 0; /* Позиция справа */
  transform: translateY(-50%); /* Сохраняем вертикальное выравнивание */
}

:deep(.dp__input) {
  height: 55px;
}

</style>