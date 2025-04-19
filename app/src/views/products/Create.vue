<template>
  <div class="create-product">
    <h1>Create Product</h1>
    <form @submit.prevent="submitProduct">
      <div>
        <label>Name:</label>
        <input v-model="product.name" required />
      </div>

      <div>
        <label>Description:</label>
        <textarea v-model="product.description" />
      </div>

      <div>
        <label>Price:</label>
        <input type="number" v-model.number="product.price" required />
      </div>

      <div>
        <label>Stock Quantity:</label>
        <input type="number" v-model.number="product.stockQuantity" required />
      </div>

      <button type="submit">Create</button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const error = ref('')

const product = reactive({
  name: '',
  description: '',
  price: 0,
  stockQuantity: 0
})

const submitProduct = async () => {
  try {
    error.value = ''
    await axios.post('/api/product', product)
    router.push('/products') // Go back to list
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to create product.'
  }
}
</script>

<style scoped>
.create-product {
  max-width: 600px;
  margin: auto;
}
form > div {
  margin-bottom: 1rem;
}
</style>
