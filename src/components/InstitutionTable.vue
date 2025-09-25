<script setup>
import { ref, computed } from 'vue';
import TableHeader from './TableHeader.vue';
import TableBody from './TableBody.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import DateRangeInput from '@/components/DateRangeInput.vue';
import axios from 'axios';

const tableData = ref([]);
const searchData = ref("");
const selectedType = ref("");
const selectedStatus = ref("");

const typeOptions = computed(() => {
  const types = tableData.value.map(el => el.type?.name).filter(Boolean);
  return [...new Set(types)];
});

const statusOptions = computed(() => {
  const statuses = tableData.value.map(el => el.status?.name).filter(Boolean);
  return [...new Set(statuses)];
});

// отфильтрованные данные для TableBody
const filteredData = computed(() => {
  return tableData.value.filter(el => {
    // Поиск по region, short_name и post_address
    const matchesSearch = !searchData.value || [
      el.edu_org.region.name,
      el.edu_org.short_name,
      el.edu_org.contact_info.post_address
    ].some(field => (field || "").toLowerCase().includes(searchData.value.toLowerCase()));

    // Фильтр по type
    const matchesType = !selectedType.value || el.type?.name === selectedType.value;

    // Фильтр по status
    const matchesStatus = !selectedStatus.value || el.status?.name === selectedStatus.value;

    return matchesSearch && matchesType && matchesStatus;
  });
});

// Получаем данные с API
async function getData() {
  try {
    const response = await axios.get("https://schooldb.skillline.ru/api/schools");
    tableData.value = response.data.data.list;
  } catch (e) {
    console.log(e);
  }
}

getData();
</script>

<template>
  <div class="table">
    <TableHeader :onSearchChange="(val) => searchData = val"/>

    <div class="table-filter">
      <div class="table-filter__item">
        <DateRangeInput/>
      </div>
      <div class="table-filter__item">
        <SelectComponent
            :options="typeOptions"
            :selected="selectedType"
            :onSelectChange="(val) => selectedType = val"
            placeholder="Выберите тип"
        />
      </div>
      <div class="table-filter__item">
        <SelectComponent
            :options="statusOptions"
            :selected="selectedStatus"
            :onSelectChange="(val) => selectedStatus = val"
            placeholder="Выберите статус"
        />
      </div>
    </div>

    <TableBody :tableData="filteredData"/>
  </div>
</template>
