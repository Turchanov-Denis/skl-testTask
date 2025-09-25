<script setup>
import {ref, watch, defineProps, defineEmits} from 'vue';

const props = defineProps({
  imagePath: {type: String, required: true},
  onChange: { type: Function, required: true }
});
</script>

<template>
  <div class="input-container">
    <input
        class="input-container__input"
        @input="(event )=>{props.onChange(event.target.value)}"
        type="text"
        placeholder="Поиск"
    />
    <img class="input-container__image" :src="imagePath" alt="">
  </div>
</template>

<style scoped lang="scss">
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
    padding-left: 15px; // Перенесено из ::placeholder
  }

  &__image {
    width: 23px;
    height: 23px;
    position: absolute;
    right: 10px;
  }
}
</style>