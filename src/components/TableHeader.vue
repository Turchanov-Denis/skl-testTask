<template>
  <div class="table-search">
    <div class="table-search__title">Таблица учреждений</div>
    <div class="table-search__container">
      <Input  :onChange="onSearchChange" :image-path="'/inputIcon.png'"/>
      <DownloadButton :image-path="'/buttonIcon.png'"/>
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
  onSearchChange: { type: Function, required: true }
})
</script>