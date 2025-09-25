<script setup>
import {ref, computed} from 'vue';
import TableHeader from './TableHeader.vue';
import TableBody from './TableBody.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import DateRangeInput from '@/components/DateRangeInput.vue';
import axios from 'axios';

const tableData = ref([]);
const searchData = ref("");
const selectedType = ref("");
const selectedStatus = ref("");
const selectedDate = ref({});
const typeOptions = computed(() => {
  const types = tableData.value.map(el => el.type?.name).filter(Boolean);
  return [...new Set(types)];
});
const downloadId = ref(new Map());
const addDownloadId = (event) => {
  const id = event.target.id;
  if (event.target.checked) {
    if (!downloadId.value.has(id)) {
      downloadId.value.set(id, true);
    }
  } else {
    downloadId.value.delete(id);
  }
  console.log('Текущий Map:', Array.from(downloadId.value.entries()));
};

const addAllDownloadId = () => {
  const allSelected = tableData.value.every(el => downloadId.value.get(el.edu_org.uuid) === true);
  if (!allSelected) {
    tableData.value.forEach(el => {
      downloadId.value.set(el.edu_org.uuid, true);
    });
  } else {
    tableData.value.forEach(el => {
      downloadId.value.set(el.edu_org.uuid, false);
    });
  }
  console.log('Текущий Map:', Array.from(downloadId.value.entries()));
};

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

    // Фильтр по дате
    const matchesDate = !selectedDate.value?.start || !selectedDate.value?.end
        ? true
        : (() => {
          const issueDate = new Date(el.issue_date);
          const start = new Date(selectedDate.value.start);
          const end = new Date(selectedDate.value.end);
          return issueDate >= start && issueDate <= end;
        })();

    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });
});


// Получаем данные с API
async function getData() {
  try {
    const response = await axios.get("https://schooldb.skillline.ru/api/schools");
    tableData.value = response.data.data.list;
    for (const item of tableData.value) {
      downloadId.value.set(item.edu_org.el.uuid, false)
    }
  } catch (e) {
    console.log(e);
  }
}

getData();
</script>

<template>
  <div class="container">
    <div class="table">
      <TableHeader :onSearchChange="(val) => searchData = val"/>

      <div class="table-filter">
        <div class="table-filter__item">
          <DateRangeInput :onSetDates="(val)=> selectedDate=val"/>
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

      <TableBody :addAllDownloadId="addAllDownloadId" :addDownloadId="addDownloadId" :tableData="filteredData" :downloadId="downloadId"/>
    </div>
  </div>
</template>
