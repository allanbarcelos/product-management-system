<template>
  <h1>Welcome to the Order Listing Page.</h1>

  <div class="filter-box">
    <label for="userFilter">Filter by User: </label>
    <select v-model="selectedUser" id="userFilter" class="dropdown">
      <option value="">All</option>
      <option value="Customer">Customer</option>
      <option value="Employee">Employee</option>
    </select>
  </div>

  <br />

  <div class="filter-box">
    <label for="statusFilter">Filter by Status: </label>
    <select v-model="selectedStatus" id="statusFilter" class="dropdown">
      <option value="">All</option>
      <option value="Shipped">Shipped</option>
      <option value="Pending">Pending</option>
      <option value="Delivered">Delivered</option>
    </select>
  </div>

  <div class="filter-box" style="margin-top: 10px;">
    <button @click="fetchData" class="search-btn">Search</button>
  </div>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>User</th>
          <th>Status</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in tableData" :key="entry.id">
          <td>{{ entry.id }}</td>
          <td>{{ entry.user }}</td>
          <td>{{ entry.status }}</td>
          <td>{{ entry.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserTable",
  data() {
    return {
      selectedUser: "",
      selectedStatus: "",
      tableData: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/api/orders", {
          params: {
            user: this.selectedUser,
            status: this.selectedStatus,
          },
        });
        this.tableData = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<style scoped>
.table-container {
  padding: 20px;
  display: flex;
  justify-content: center;
}

table {
  border-collapse: collapse;
  width: 60%;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
}

.search-btn {
  padding: 6px 16px;
  margin-top: 10px;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-btn:hover {
  background-color: #005fa3;
}
</style>
