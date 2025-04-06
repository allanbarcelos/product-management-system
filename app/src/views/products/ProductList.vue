<template>
    <div class="product-list">
      <h1>Dummy Product List</h1>
  
      <div class="sort-controls">
        <label for="sort">Sort by:</label>
        <select v-model="sortOption" @change="sortProducts" id="sort">
          <option value="name">Name (A–Z)</option>
          <option value="price">Price (Low to High)</option>
        </select>
      </div>
  
      <div class="products-grid">
        <div class="product-card" v-for="product in products" :key="product.id">
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <p><strong>Price:</strong> ${{ product.price.toFixed(2) }}</p>
          <p><strong>In Stock:</strong> {{ product.stockQuantity }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sortOption: 'name',
        products: [
          {
            id: 1,
            name: "Wireless Mouse",
            description: "Ergonomic wireless mouse with long battery life.",
            price: 29.99,
            stockQuantity: 120
          },
          {
            id: 2,
            name: "Mechanical Keyboard",
            description: "RGB backlit mechanical keyboard with blue switches.",
            price: 79.99,
            stockQuantity: 75
          },
          {
            id: 3,
            name: "HD Monitor",
            description: "24-inch full HD monitor with HDMI and VGA support.",
            price: 149.99,
            stockQuantity: 32
          },
          {
            id: 4,
            name: "USB-C Hub",
            description: "Multi-port USB-C hub with HDMI and USB 3.0.",
            price: 39.99,
            stockQuantity: 200
          },
          {
            id: 5,
            name: "Gaming Headset",
            description: "Surround sound headset with noise-canceling mic.",
            price: 59.99,
            stockQuantity: 48
          }
        ]
      };
    },
    methods: {
      sortProducts() {
        if (this.sortOption === 'name') {
          this.products.sort((a, b) => a.name.localeCompare(b.name));
        } else if (this.sortOption === 'price') {
          this.products.sort((a, b) => a.price - b.price);
        }
      }
    },
    mounted() {
      this.sortProducts(); // Sort initially on mount
    }
  };
  </script>
  
  <style scoped>
.product-list {
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.sort-controls label {
  font-weight: 500;
}

.sort-controls select {
  padding: 0.4rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.sort-controls select:hover {
  border-color: #888;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.product-card {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.product-card h2 {
  margin: 0 0 0.5rem;
}
</style>