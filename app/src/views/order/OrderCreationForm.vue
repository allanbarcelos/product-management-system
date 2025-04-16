<template>
  <div class="order-form">
    <h1>Create Order</h1>
    <v-select
      v-model="selectedProducts"
      :items="productsWithText"
      item-title="displayText"
      item-value="id"
      multiple
      chips
      return-object
      label="Select Products"
    />
    <div class="order-summary">
      <p><strong>Selected Products:</strong></p>
      <ul>
        <li v-for="product in selectedProducts" :key="product.id">
          {{ product.name }} - ${{ product.price }}
        </li>
      </ul>
      <p><strong>Total Price:</strong> ${{ totalPrice.toFixed(2) }}</p>
    </div>
    <v-btn @click="submitOrder" color="primary">Submit Order</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedProducts: [],
      products: [
        { id: 1, name: "Laptop", price: 1299.99 },
        { id: 2, name: "Mouse", price: 19.99 },
        { id: 3, name: "Keyboard", price: 59.99 },
        { id: 4, name: "Monitor", price: 229.99 },
        { id: 5, name: "Headphones", price: 89.99 },
      ],
    };
  },
  computed: {
    productsWithText() {
      return this.products.map(p => ({
        ...p,
        displayText: `${p.name} ($${p.price.toFixed(2)})`
      }));
    },
    totalPrice() {
      return this.selectedProducts.reduce((total, product) => total + product.price, 0);
    }
  },
  methods: {
    submitOrder() {
      // Logic for submitting the order
      alert('Order submitted!');
    }
  }
};
</script>

<style lang="scss" scoped>
.order-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.order-summary {
  margin-top: 1rem;
  font-weight: bold;
}
</style>
