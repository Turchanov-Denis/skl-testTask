<script setup>
// TODO: make sort table
const props = defineProps({
  data: Array
});
</script>

<template>
  <table class="table-body">
    <thead class="table-body__head">
    <tr>
      <th class="table-body__cell table__cell--header">Регионы</th>
      <th class="table-body__cell table__cell--header">Название</th>
      <th class="table-body__cell table__cell--header">Адрес</th>
      <th class="table-body__cell table__cell--header">Уровень образования</th>
    </tr>
    </thead>
    <tbody class="table-body__body">
    <tr v-for="item in data" :key="item.id" class="table-body__row">
      <td class="table-body__cell">{{ item.name }}</td>
      <td class="table-body__cell">{{ item.name }}</td>
      <td class="table-body__cell">{{ item.address }}</td>
      <td class="table-body__cell">{{ item.educationLevel }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">

</style>