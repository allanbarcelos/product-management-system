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
export default {
  name: "UserTable",
  data() {
    return {
      tableData: [
        { id: 1, user: "Customer", status: "Delivered", name: "Mike" },
        { id: 2, user: "Employee", status: "Pending", name: "Wentao" },
        { id: 3, user: "", status: "Shipped", name: "Juncheng" },
      ],
    };
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
</style>