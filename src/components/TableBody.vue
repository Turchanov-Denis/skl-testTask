<script setup>
import {ref, computed} from 'vue';

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
  loading: {
    type: Boolean,
  }
});

const currentPage = ref(1);
const perPage = ref(8);
const sortKey = ref(''); // Column key
const sortOrder = ref(1); // 1 = ascending, -1 = descending

const sortedTableData = computed(() => {
  if (!sortKey.value) return props.tableData;

  return [...props.tableData].sort((a, b) => {
    let aValue = '';
    let bValue = '';

    switch (sortKey.value) {
      case 'region':
        aValue = a.edu_org.region?.name || '';
        bValue = b.edu_org.region?.name || '';
        break;
      case 'short_name':
        aValue = a.edu_org.short_name || '';
        bValue = b.edu_org.short_name || '';
        break;
      case 'post_address':
        aValue = a.edu_org.contact_info?.post_address || '';
        bValue = b.edu_org.contact_info?.post_address || '';
        break;
      case 'education_level':
        aValue = 'Среднее Высшее Специальное Проф Бакалавр';
        bValue = 'Среднее Высшее Специальное Проф Бакалавр';
        break;
    }

    return aValue.localeCompare(bValue) * sortOrder.value;
  });
});

const totalPages = computed(() => Math.ceil(sortedTableData.value.length / perPage.value));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return sortedTableData.value.slice(start, end);
});

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

const toggleSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value *= -1;
  } else {
    sortKey.value = key;
    sortOrder.value = 1;
  }
  currentPage.value = 1;
};
</script>

<template>
  <div>
    <div class="table-body-wrapper">
      <table class="table-body">
        <thead class="table-body__head">
        <tr>
          <th class="table-body__cell table__cell--header">
            <input type="checkbox" @change="props.addAllDownloadId"/>
          </th>
          <th class="table-body__cell table__cell--header" @click="toggleSort('region')" style="cursor:pointer;">
            Регионы
            <img v-if="sortKey === 'region'" :src="sortOrder === 1 ? '/arrowUp.png' : '/arrowDown.png'"
                 class="sort-icon"/>
          </th>
          <th class="table-body__cell table__cell--header" @click="toggleSort('short_name')" style="cursor:pointer;">
            Название
            <img v-if="sortKey === 'short_name'" :src="sortOrder === 1 ? '/arrowUp.png' : '/arrowDown.png'"
                 class="sort-icon"/>
          </th>
          <th class="table-body__cell table__cell--header" @click="toggleSort('post_address')" style="cursor:pointer;">
            Адрес
            <img v-if="sortKey === 'post_address'" :src="sortOrder === 1 ? '/arrowUp.png' : '/arrowDown.png'"
                 class="sort-icon"/>
          </th>
          <th class="table-body__cell table__cell--header" @click="toggleSort('education_level')"
              style="cursor:pointer;">
            Уровень образования
            <img v-if="sortKey === 'education_level'" :src="sortOrder === 1 ? '/arrowUp.png' : '/arrowDown.png'"
                 class="sort-icon"/>
          </th>
        </tr>
        </thead>

        <tbody class="table-body__body">

        <tr v-if="!loading && paginatedData.length === 0">
          <td class="table-body__cell" colspan="5" style="text-align: center; padding: 16px;">
            Нет записей
          </td>
        </tr>
        <tr v-else v-for="item in paginatedData" :key="item.id" class="table-body__row">
          <td class="table-body__cell">
            <input
                type="checkbox"
                :checked="props.downloadId.get(item.edu_org.uuid)"
                :id="item.edu_org.uuid"
                @change="props.addDownloadId"
            />
          </td>
          <td class="table-body__cell">{{ item.edu_org.region.name }}</td>
          <td class="table-body__cell">{{ item.edu_org.short_name || 'None' }}</td>
          <td class="table-body__cell">{{ item.edu_org.contact_info.post_address }}</td>
          <td class="table-body__cell">Среднее Высшее Специальное Проф Бакалавр</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <div>
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">‹</button>
        <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="{ active: page === currentPage }"
        >
          {{ page }}
        </button>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">›</button>
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

<style scoped>
.sort-icon {
  width: 12px;
  height: 12px;
  margin-left: 4px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

button.active {
  font-weight: bold;
}
</style>
