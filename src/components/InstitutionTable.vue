<template>
  <div class="container">
    <div class="table">
      <TableHeader ref="header"/>
      <TableFilters/>
      <TableBody :data="tableData"/>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import TableHeader from './TableHeader.vue';
import TableFilters from './TableFilters.vue';
import TableBody from './TableBody.vue';

const tableData = ref([{
  id: 1,
  name: 'МБОУ Средняя общеобразовательная школа №2',
  address: 'ул. Новая, д. 13',
  educationLevel: 'Среднее'
},{
  id: 1,
  name: 'МБОУ Средняя общеобразовательная школа №2',
  address: 'ул. Новая, д. 13',
  educationLevel: 'Среднее'
},{
  id: 1,
  name: 'МБОУ Средняя общеобразовательная школа №2',
  address: 'ул. Новая, д. 13',
  educationLevel: 'Среднее'
}]);
</script>