<template>
  <button @click="downloadData">Скачать</button>
</template>

<script setup>
const downloadData = () => {
  console.log('Данные скачаны');
};
</script>