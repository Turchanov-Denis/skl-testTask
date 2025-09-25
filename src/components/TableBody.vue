<script setup>
// TODO: make sort table
const props = defineProps({
  data: Array
});
</script>

<template>
  <table class="table">
    <thead class="table__head">
    <tr>
      <th class="table__cell table__cell--header">Регионы</th>
      <th class="table__cell table__cell--header">Название</th>
      <th class="table__cell table__cell--header">Адрес</th>
      <th class="table__cell table__cell--header">Уровень образования</th>
    </tr>
    </thead>
    <tbody class="table__body">
    <tr v-for="item in data" :key="item.id" class="table__row">
      <td class="table__cell">{{ item.name }}</td>
      <td class="table__cell">{{ item.name }}</td>
      <td class="table__cell">{{ item.address }}</td>
      <td class="table__cell">{{ item.educationLevel }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">

</style>