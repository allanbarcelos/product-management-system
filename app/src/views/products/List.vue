<template>
  <div>
    <!-- Page Header -->
    <h1>Welcome to the Product Listing Page.</h1>

    <!-- Sorting Options Dropdown -->
    <div>
      <label for="sort">Sort by: </label>
      <!-- v-model binds the selected value to sortKey -->
      <!-- @change triggers a method (optional in this case due to computed property) -->
      <select v-model="sortKey" @change="sortProducts">
        <option value="name">Name (A-Z)</option>
        <option value="priceLowHigh">Price (Low to High)</option>
        <option value="priceHighLow">Price (High to Low)</option>
      </select>
    </div>

    <!-- Display Sorted Product List -->
    <ul>
      <!-- v-for loops through sortedProducts and renders each item -->
      <li v-for="product in sortedProducts" :key="product.id">
        {{ product.name }} - ${{ product.price.toFixed(2) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Currently selected sorting key
      sortKey: 'name',

      // Hardcoded product data for demonstration
      products: [
        { id: 1, name: 'Watch', price: 19.99 },
        { id: 2, name: 'Gadget', price: 9.99 },
        { id: 3, name: 'Spector', price: 14.99 }
      ]
    }
  },
  computed: {
    // Returns a sorted array of products based on the selected sortKey
    sortedProducts() {
      // Copy original array to avoid mutating the source
      let sorted = [...this.products];
      switch (this.sortKey) {
        case 'name':
          // Sort alphabetically by name
          return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'priceLowHigh':
          // Sort by price ascending
          return sorted.sort((a, b) => a.price - b.price);
        case 'priceHighLow':
          // Sort by price descending
          return sorted.sort((a, b) => b.price - a.price);
        default:
          // Return unsorted if sortKey is unrecognized
          return sorted;
      }
    }
  },
  methods: {
    // Optional method to respond to dropdown change
    // Included in case further logic is needed
    sortProducts() {
      // No logic needed currently, but method exists to trigger reactivity if necessary
    }
  }
}
</script>

<style scoped>
/* Basic styling for dropdown UI */
label {
  margin-right: 8px;
}
select {
  margin-bottom: 20px;
}
</style>
