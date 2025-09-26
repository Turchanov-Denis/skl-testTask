<template>
  <div class="download-button-container">
    <button class="download-button-container__button" >Скачать</button>
    <img class="download-button-container__image" :src="imagePath" alt="">
  </div>
</template>

<script setup>

const props = defineProps({
  imagePath: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.download-button-container {

  display: flex;
  align-items: center;
  position: relative;

  &__button {
    border-radius: 10px;
    width: 147px;
    height: 56px;
    background: #33d35e;
    font-family: Gotham Pro, serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    text-align: center;
    color: #0e0e10;
  }

  &__image {
    width: 23px;
    height: 23px;
    position: absolute;
    left: 10px;

  }
}

</style>