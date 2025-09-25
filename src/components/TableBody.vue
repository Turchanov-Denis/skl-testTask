<script setup>
import { ref, computed } from "vue";
// TODO: ADD SORTING
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

// выбранная страница
const currentPage = ref(1);
// сколько элементов показывать
const perPage = ref(10);

// общее количество страниц
const totalPages = computed(() =>
    Math.ceil(props.data.length / perPage.value)
);

// вычисляем какие данные показывать
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return props.data.slice(start, end);
});

// переключение страницы
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
          <th class="table-body__cell table__cell--header">Регионы</th>
          <th class="table-body__cell table__cell--header">Название</th>
          <th class="table-body__cell table__cell--header">Адрес</th>
          <th class="table-body__cell table__cell--header">Уровень образования</th>
        </tr>
        </thead>
        <tbody class="table-body__body">
        <tr
            v-for="item in paginatedData"
            :key="item.id"
            class="table-body__row"
        >
          <td class="table-body__cell">{{ item.name }}</td>
          <td class="table-body__cell">{{ item.name }}</td>
          <td class="table-body__cell">{{ item.address }}</td>
          <td class="table-body__cell">{{ item.educationLevel }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- пагинация -->
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

      <!-- выбор количества на странице -->
      <div>
        <select v-model="perPage" @change="goToPage(1)">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>

        <span>
        {{ (currentPage - 1) * perPage + 1 }} -
        {{ Math.min(currentPage * perPage, props.data.length) }}
        из {{ props.data.length }}
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
}
button.active {
  font-weight: bold;
}
</style>
