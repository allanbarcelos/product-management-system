<!-- src/views/ProductDetails.vue -->
<template>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
      <p><strong>Price:</strong> ${{ product.price.toFixed(2) }}</p>
      <p><strong>In Stock:</strong> {{ product.stockQuantity }}</p>
      <router-link to="/" class="back-link">← Back to Products</router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: null
      };
    },
    created() {
      const productId = parseInt(this.$route.params.id);
      
      // Dummy product list (you can move this to a shared file or fetch from backend later)
      const allProducts = [
        { id: 1, name: "Wireless Mouse", description: "Ergonomic wireless mouse with long battery life.", price: 29.99, stockQuantity: 120 },
        { id: 2, name: "Mechanical Keyboard", description: "RGB backlit mechanical keyboard with blue switches.", price: 79.99, stockQuantity: 75 },
        { id: 3, name: "HD Monitor", description: "24-inch full HD monitor with HDMI and VGA support.", price: 149.99, stockQuantity: 32 },
        { id: 4, name: "USB-C Hub", description: "Multi-port USB-C hub with HDMI and USB 3.0.", price: 39.99, stockQuantity: 200 },
        { id: 5, name: "Gaming Headset", description: "Surround sound headset with noise-canceling mic.", price: 59.99, stockQuantity: 48 }
      ];
  
      this.product = allProducts.find(p => p.id === productId);
    }
  };
  </script>
  
  <style scoped>
  .product-details {
    padding: 2rem;
    max-width: 600px;
    margin: auto;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .back-link {
    display: inline-block;
    margin-top: 2rem;
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  </style>