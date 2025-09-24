<template>
  <div>
    <TableHeader ref="header" />
    <TableFilters />
    <TableBody :data="tableData" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TableHeader from './TableHeader.vue';
import TableFilters from './TableFilters.vue';
import TableBody from './TableBody.vue';
import DownloadButton from './DownloadButton.vue';

const tableData = ref([]);

const header = ref(null);
</script>