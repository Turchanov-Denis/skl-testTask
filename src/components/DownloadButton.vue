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
    font-weight: 700;
    font-size: 16px;
    text-align: right;
    padding-right: 20px;
    color: #0e0e10;
    background: #33d35e;
    &:hover {
      background: #16b13f;
    }
  }

  &__image {
    width: 23px;
    height: 23px;
    position: absolute;
    left: 28px;

  }
}

</style>