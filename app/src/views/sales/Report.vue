<template>
  <div class="sales-report">
    <div class="page-header">
      <h1>Sales Report</h1>
      <div class="actions">
        <button class="btn btn-secondary" @click="exportReport">
          <i class="fas fa-download"></i> Export
        </button>
      </div>
    </div>

    <div class="summary-cards">
      <div class="card">
        <div class="card-title">Total Sales</div>
        <div class="card-value">${{ totalSales }}</div>
      </div>
      <div class="card">
        <div class="card-title">Total Orders</div>
        <div class="card-value">{{ totalOrders }}</div>
      </div>
      <div class="card">
        <div class="card-title">Average Order Value</div>
        <div class="card-value">${{ averageOrderValue }}</div>
      </div>
    </div>

    <div class="filters-section">
      <div class="filters">
        <div class="filter-group">
          <label>Date Range</label>
          <div class="date-range">
            <input type="date" v-model="startDate" />
            <span>to</span>
            <input type="date" v-model="endDate" />
          </div>
        </div>
        
        <div class="filter-group">
          <label>Customer</label>
          <select v-model="selectedCustomer">
            <option value="">All Customers</option>
            <option v-for="customer in customers" :key="customer.id" :value="customer.id">
              {{ customer.name }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label>Product</label>
          <select v-model="selectedProduct">
            <option value="">All Products</option>
            <option v-for="product in products" :key="product.id" :value="product.id">
              {{ product.name }}
            </option>
          </select>
        </div>

        <button class="btn btn-primary" @click="fetchSalesData">
          <i class="fas fa-search"></i> Generate Report
        </button>
      </div>
    </div>

    <div class="report-content">
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sale in salesData" :key="sale.id">
              <td>{{ formatDate(sale.date) }}</td>
              <td>{{ sale.orderId }}</td>
              <td>{{ sale.customer }}</td>
              <td>{{ sale.product }}</td>
              <td>{{ sale.quantity }}</td>
              <td>${{ sale.unitPrice }}</td>
              <td>${{ sale.totalAmount }}</td>
              <td>
                <span :class="['status-badge', sale.status.toLowerCase()]">
                  {{ sale.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// State
const startDate = ref('')
const endDate = ref('')
const selectedCustomer = ref('')
const selectedProduct = ref('')
const salesData = ref([])
const customers = ref([])
const products = ref([])

// Computed properties
const totalSales = computed(() => {
  return salesData.value.reduce((sum, sale) => sum + sale.totalAmount, 0).toFixed(2)
})

const totalOrders = computed(() => salesData.value.length)

const averageOrderValue = computed(() => {
  if (totalOrders.value === 0) return '0.00'
  return (Number(totalSales.value) / totalOrders.value).toFixed(2)
})

// Methods
const fetchSalesData = async () => {
  // TODO: Implement API call to fetch sales data
  // This is a placeholder for the actual implementation
  salesData.value = [
    {
      id: 1,
      date: '2024-04-01',
      orderId: 'ORD-001',
      customer: 'John Doe',
      product: 'Product A',
      quantity: 2,
      unitPrice: 99.99,
      totalAmount: 199.98,
      status: 'Completed'
    },
    {
      id: 2,
      date: '2024-04-02',
      orderId: 'ORD-002',
      customer: 'Jane Smith',
      product: 'Product B',
      quantity: 1,
      unitPrice: 149.99,
      totalAmount: 149.99,
      status: 'Pending'
    }
  ]
}

const exportReport = () => {
  // TODO: Implement export functionality
  console.log('Exporting report...')
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

// Fetch initial data
const fetchCustomers = async () => {
  // TODO: Implement API call to fetch customers
  customers.value = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]
}

const fetchProducts = async () => {
  // TODO: Implement API call to fetch products
  products.value = [
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' }
  ]
}

// Initialize data
fetchCustomers()
fetchProducts()
</script>

<style lang="scss">
@import '@/scss/sales/report.scss';
</style> 