<template>
  <div class="categories">
    <h1 class="title">Categories</h1>

    <div v-if="loading" class="loading">Loading categories...</div>

    <div v-else>
      <!-- Add Category Form -->
      <AddCategoryForm @category-added="addCategoryToList" />

      <div v-if="categories.length === 0" class="empty">
        No categories found.
      </div>

      <div class="category-list">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="category-card"
        >
          <h2 class="category-name">{{ category.name }}</h2>
          <p class="category-description">{{ category.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import AddCategoryForm from "./AddCategoryForm.vue";

const categories = ref<any[]>([]);
const loading = ref<boolean>(false);

const loadCategories = async () => {
  try {
    loading.value = true;
    const response = await fetch("https://localhost:5000/api/categories");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    categories.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const addCategoryToList = (newCategory: any) => {
  categories.value.push(newCategory);
};

onMounted(() => {
  loadCategories();
});
</script>

<style src="@/scss/category.scss" scoped></style>
