<template>
  <form @submit.prevent="handleSubmit" class="add-category-form">
    <div class="form-group">
      <label for="name">Category Name</label>
      <input
        type="text"
        id="name"
        v-model="formData.name"
        placeholder="Enter category name"
        required
      />
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="formData.description"
        placeholder="Enter category description"
        required
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Add Category</button>
  </form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const formData = ref({ name: "", description: "" });
const emits = defineEmits(["category-added"]);

const handleSubmit = async () => {
  try {
    const response = await fetch("https://localhost:5000/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData.value),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const newCategory = await response.json();
    emits("category-added", newCategory);
    formData.value = { name: "", description: "" }; // Reset form
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.add-category-form {
  margin-bottom: 2rem;
}
.add-category-form .form-group {
  margin-bottom: 1rem;
}
.add-category-form .btn {
  margin-top: 1rem;
}
</style>
