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
const sortKey = ref(''); // Track the column to sort by
const sortOrder = ref(1); // 1 for ascending (arrowUp), -1 for descending (arrowDown)

// Computed property to sort tableData
const sortedTableData = computed(() => {
  if (!sortKey.value) return props.tableData; // No sorting if no key is selected

  return [...props.tableData].sort((a, b) => {
    let aValue, bValue;

    if (sortKey.value === 'region') {
      aValue = a.edu_org.region?.name || '';
      bValue = b.edu_org.region?.name || '';
    } else if (sortKey.value === 'short_name') {
      aValue = a.edu_org.short_name || '';
      bValue = b.edu_org.short_name || '';
    } else if (sortKey.value === 'post_address') {
      aValue = a.edu_org.contact_info?.post_address || '';
      bValue = b.edu_org.contact_info?.post_address || '';
    } else {
      return 0;
    }

    return aValue.localeCompare(bValue) * sortOrder.value;
  });
});

// Compute total pages based on sorted data
const totalPages = computed(() => Math.ceil(sortedTableData.value.length / perPage.value));

// Compute paginated data from sorted data
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return sortedTableData.value.slice(start, end);
});

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

// Toggle sorting when clicking a column header
const toggleSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value *= -1; // Toggle between ascending and descending
  } else {
    sortKey.value = key;
    sortOrder.value = 1; // Default to ascending (arrowUp)
  }
  currentPage.value = 1; // Reset to first page on sort
};

// Get the sort icon based on sortKey and sortOrder
const getSortIcon = (key) => {
  if (sortKey.value !== key) return '/arrowDown.png'; // Default icon
  return sortOrder.value === 1 ? '/arrowUp.png' : '/arrowDown.png';
};
</script>

<template>
  <div>
    <div class="table-body-wrapper">
      <table class="table-body">
        <thead class="table-body__head">
        <tr>
          <th class="table-body__cell table__cell--header">
            <input @change="addAllDownloadId" type="checkbox">
            <span @click="toggleSort('region')" style="cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                Регионы
                <img :src="getSortIcon('region')" alt="Sort" style="width: 16px; height: 16px;" />
              </span>
          </th>
          <th class="table-body__cell table__cell--header" @click="toggleSort('short_name')" style="cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
            Название
            <img :src="getSortIcon('short_name')" alt="Sort" style="width: 16px; height: 16px;" />
          </th>
          <th class="table-body__cell table__cell--header" @click="toggleSort('post_address')" style="cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
            Адрес
            <img :src="getSortIcon('post_address')" alt="Sort" style="width: 16px; height: 16px;" />
          </th>
          <th class="table-body__cell table__cell--header">
            Уровень образования
          </th>
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
          {{ Math.min(currentPage * perPage, sortedTableData.length) }}
          из {{ sortedTableData.length }}
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

.table-body__cell span {
  display: inline-flex;
  align-items: center;
}
</style>