<template>
  <div class="container">
    <div>Таблица учреждений</div>
    <input type="text" v-model="searchQuery" placeholder="Поиск"/>
    <DownloadButton/>
  </div>

</template>

<script setup>
import {ref} from 'vue';
import DownloadButton from "@/components/DownloadButton.vue";

const searchQuery = ref('');
</script>