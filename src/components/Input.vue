<script setup >
import {ref} from 'vue';
const searchQuery = ref('');
const props = defineProps({
  imagePath: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="input-container">
    <input class="input-container__input" type="text" v-model="searchQuery" placeholder="Поиск"/>
    <img class="input-container__image" :src="imagePath" alt="">
  </div>
</template>

<style lang="scss" scoped>

.input-container {
  width: 300px;
  height: 56px;
  display: flex;
  align-items: center;
  position: relative;

  &__input {
    width: 100%;
    height: 100%;
    border: 1px solid #d3d3de;
    border-radius: 10px;

    &::placeholder {
      padding-left: 15px;
    }
  }

  &__image {
    width: 23px;
    height: 23px;
    position: absolute;
    right: 10px;

  }
}
</style>