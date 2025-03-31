<template>
  <div>
    <h1>Order Listing</h1>
    <ul>
      <li v-for="order in orders" :key="order.id">
        {{ order.customerName }} - {{ order.date }} - {{ order.status }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [] // Store orders
    };
  },
  created() {
    this.fetchOrders(); // Fetch orders on component creation
  },
  methods: {
    async fetchOrders() {
      const response = await fetch('http://localhost:5000/api/orders'); // Update URL as necessary
      this.orders = await response.json();
    }
  }
};
</script>
