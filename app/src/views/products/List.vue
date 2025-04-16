<template>
    <div>
      <h1>Product Listing Page</h1>
  
      <label for="category">Filter by Category:</label>
      <select v-model="selectedCategory" @change="filterProducts" id="category">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">
          {{ cat.name }}
        </option>
      </select>
  
      <ul>
        <li v-for="product in products" :key="product.id">
          <strong>{{ product.name }}</strong> - {{ product.category }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  const products = ref<any[]>([])
  const originalProducts = ref<any[]>([])
  const categories = ref<any[]>([])
  const selectedCategory = ref('')
  
  const loadProducts = async () => {
    const response = await fetch('https://localhost:5000/api/products')
    const data = await response.json()
    originalProducts.value = data
    products.value = data
  }
  
  // Load categories
  const loadCategories = async () => {
    const response = await fetch('https://localhost:5000/api/category')
    const data = await response.json()
    categories.value = data
  }
  
  // Filter by selected category
  const filterProducts = () => {
    if (!selectedCategory.value) {
      products.value = originalProducts.value
    } else {
      products.value = originalProducts.value.filter(
        p => p.category === selectedCategory.value
      )
    }
  }
  
  onMounted(() => {
    loadProducts()
    loadCategories()
  })
  </script>
  