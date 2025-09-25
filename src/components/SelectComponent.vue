<template>
  <select :value="selected" @change="e => onSelectChange(e.target.value)">
    <option value="">{{ placeholder }}</option>
    <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
  </select>
</template>

<script setup>
const props = defineProps({
  options: Array,
  selected: String,
  onSelectChange: Function,
  placeholder: {
    type: String,
    default: "Выберите"
  }
});
</script>

<style lang="scss" scoped>
.select-component {
  width: 100%;
  border: 1px solid #d3d3de;
  border-radius: 10px;
  height: 56px;
  padding-left: 15px;
}
</style>
