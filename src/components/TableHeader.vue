<template>
  <div>
    <div>Таблица учреждений</div>
    </div>
    <div>
      <input type="text" v-model="searchQuery" placeholder="Поиск" />
    </div>
  <DownloadButton />

</template>

<script setup>
import { ref } from 'vue';
import DownloadButton from "@/components/DownloadButton.vue";

const searchQuery = ref('');
</script>