<template>
  <div>
    <h2>Product Listing</h2>

    <div>
      <label for="category">Filter by Category:</label>
      <select v-model="selectedCategoryId" @change="fetchProducts">
        <option value="">All Categories</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div v-if="products.length === 0">
      <p>No products found.</p>
    </div>
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - ${{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const categories = ref([])
const selectedCategoryId = ref('')

// Get categories when loading the view
const fetchCategories = async () => {
  try {
    const res = await axios.get('/api/categories')
    categories.value = res.data
  } catch (error) {
    console.error('Error fetching categories', error)
  }
}

// Get filtered or unfiltered products
const fetchProducts = async () => {
  try {
    const categoryParam = selectedCategoryId.value
      ? `?categoryId=${selectedCategoryId.value}`
      : ''
    const res = await axios.get(`/api/products${categoryParam}`)
    products.value = res.data
  } catch (error) {
    console.error('Error fetching products', error)
  }
}

// On startup, load both
onMounted(async () => {
  await fetchCategories()
  await fetchProducts()
})
</script>
