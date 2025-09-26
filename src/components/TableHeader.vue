<template>
  <div class="table-search">
    <div class="table-search__title">Таблица учреждений</div>
    <div class="table-search__container">
      <Input :onChange="onSearchChange" :imagePath="'inputIcon.png'"/>
      <div class="table-search__container">
        <DownloadButton @click="downloadData" :imagePath="'buttonIcon.png'"/>
        <button @click="onUpdate" class="table-search__update">Обновить</button>
      </div>
    </div>
  </div>

</template>

<script setup>
import DownloadButton from "@/components/DownloadButton.vue";
import Input from "@/components/Input.vue";

const props = defineProps({
  searchData: {
    type: String
  },
  onSearchChange: {type: Function, required: true},
  downloadData: {type: Function, required: true},
  onUpdate: {type: Function, required: true},
})
</script>