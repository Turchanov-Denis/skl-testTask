<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  tableData: {
    type: Array,
    required: true,
  },
  downloadId: {
    type: Map,
    required: true,
  },
  searchData: {
    type: String,
  },
  addDownloadId: {
    type: Function,
    required: true,
  },
  addAllDownloadId: {
    type: Function,
    required: true,
  },
});

const currentPage = ref(1);
const perPage = ref(8);

const totalPages = computed(() => Math.ceil(props.tableData.length / perPage.value));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return props.tableData.slice(start, end);
});

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};
</script>

<template>
  <div>
    <div class="table-body-wrapper">
      <table class="table-body">
        <thead class="table-body__head">
        <tr>
          <th class="table-body__cell table__cell--header">
            <input @change="addAllDownloadId" type="checkbox"> Регионы
          </th>
          <th class="table-body__cell table__cell--header">Название</th>
          <th class="table-body__cell table__cell--header">Адрес</th>
          <th class="table-body__cell table__cell--header">Уровень образования</th>
        </tr>
        </thead>
        <tbody class="table-body__body">
        <tr v-for="item in paginatedData" :key="item.id" class="table-body__row">
          <td class="table-body__cell">
            <input
                :checked="props.downloadId.get(item.edu_org.uuid)"
                @change="props.addDownloadId"
                :id="item.edu_org.uuid"
                type="checkbox"
            />
            {{ item.edu_org.region.name }}
          </td>
          <td class="table-body__cell">
            {{ item.edu_org.short_name || 'None' }}
          </td>
          <td class="table-body__cell">
            {{ item.edu_org.contact_info.post_address }}
          </td>
          <td class="table-body__cell">
            {{ 'Среднее Высшее Специальное Проф Бакалавр' }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <div>
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
          ‹
        </button>
        <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="{ active: page === currentPage }"
        >
          {{ page }}
        </button>
        <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
        >
          ›
        </button>
      </div>
      <div>
        <select v-model="perPage" @change="goToPage(1)">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
        <span>
          {{ (currentPage - 1) * perPage + 1 }} -
          {{ Math.min(currentPage * perPage, props.tableData.length) }}
          из {{ props.tableData.length }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  height: 36px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 12px;

  button {
    padding: 5px;
  }
}

button.active {
  font-weight: bold;
}
</style>