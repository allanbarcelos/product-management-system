<template>
    <div class="categories">
      <h1 class="title">Edit Category</h1>
  
      <div v-if="loading" class="loading">Loading category...</div>
  
      <form v-else @submit.prevent="updateCategory" class="category-form">
        <div>
          <label for="name">Name:</label>
          <input v-model="category.name" id="name" required maxlength="100" />
        </div>
  
        <div>
          <label for="description">Description:</label>
          <textarea v-model="category.description" id="description" maxlength="500"></textarea>
        </div>
  
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  const loading = ref(true)
  const category = ref({ id: 0, name: '', description: '' })
  
  const loadCategory = async () => {
    try {
      const response = await fetch(`https://localhost:5000/api/categories/${route.params.id}`)
      if (!response.ok) throw new Error('Failed to load category')
      category.value = await response.json()
    } catch (err) {
      console.error(err)
      alert('Error loading category.')
    } finally {
      loading.value = false
    }
  }
  
  const updateCategory = async () => {
    try {
      const response = await fetch(`https://localhost:5000/api/categories/${category.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category.value),
      })
      if (!response.ok) throw new Error('Failed to update category')
      alert('Category updated successfully!')
      router.push('/categories')
    } catch (err) {
      console.error(err)
      alert('Error updating category.')
    }
  }
  
  onMounted(loadCategory)
  </script>
  
  <style scoped>
  .category-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
    margin: 0 auto;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }
  
  button {
    background-color: #3498db;
    color: white;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  