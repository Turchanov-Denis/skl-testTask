<template>
  <div class="table-search">
    <div class="table-search__title">Таблица учреждений</div>
    <div class="table-search__container">
      <Input :image-path="'public/inputIcon.png'"/>
      <DownloadButton :image-path="'public/buttonIcon.png'"/>
    </div>
  </div>

</template>

<script setup>
import DownloadButton from "@/components/DownloadButton.vue";
import Input from "@/components/Input.vue";
</script>