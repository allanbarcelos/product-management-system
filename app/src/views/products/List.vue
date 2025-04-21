<template>
    <h1>Welcome to the Product Listing Page.</h1>
</template>
  <div>
    <h1>Product Listing</h1>

    <div class="filters">
      <input v-model="filters.name" placeholder="Search by name" />
      <input type="number" v-model.number="filters.minPrice" placeholder="Min Price" />
      <input type="number" v-model.number="filters.maxPrice" placeholder="Max Price" />
      <input type="number" v-model.number="filters.minStock" placeholder="Min Stock" />
      <button @click="fetchProducts">Apply Filters</button>
    </div>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <table v-if="products.length">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stockQuantity }}</td>
          </tr>
        </tbody>
      </table>

      <div v-else>No products found.</div>

      <div class="pagination">
        <button :disabled="page === 1" @click="page-- && fetchProducts()">Previous</button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button :disabled="page === totalPages" @click="page++ && fetchProducts()">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
    name: "ProductList",
    data() {
        return {
        filters: {
            name: "",
            minPrice: null,
            maxPrice: null,
            minStock: null
        },
        page: 1,
        pageSize: 10,
        totalPages: 1,
        products: [],
        loading: false
        };
    },
    methods: {
        async fetchProducts() {
        this.loading = true;
        const params = new URLSearchParams({
            ...this.filters,
            page: this.page,
            pageSize: this.pageSize
        });
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/product/filter?${params}`);
            const data = await res.json();
            this.products = data.items;
            this.totalPages = data.totalPages;
            this.page = data.currentPage;
        } catch (err) {
            console.error("Failed to fetch products:", err);
        } finally {
            this.loading = false;
        }
        }
    },
    mounted() {
        this.fetchProducts();
    }
    };
</script>
<style scoped>
    .filters {
    margin-bottom: 1rem;
    display: flex;
    gap: 0.5rem;
    }
    .pagination {
    margin-top: 1rem;
    }
</style>