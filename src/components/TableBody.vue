<script setup>
// TODO: make sort table
const props = defineProps({
  data: Array
});
</script>

<template>
  <table>
    <thead>
    <tr>
      <th>Название</th>
      <th>Адрес</th>
      <th>Уровень образования</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in data" :key="item.id">
      <td>{{ item.name }}</td>
      <td>{{ item.address }}</td>
      <td>{{ item.educationLevel }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>