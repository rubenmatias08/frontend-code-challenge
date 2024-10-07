<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="users"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>User Management</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="editUser(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteUser(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-divider></v-divider>

    <v-data-table
      :headers="orderHeaders"
      :items="orders"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Order Management</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="editOrder(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteOrder(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      orders: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'fullName' },
        { text: 'Email', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      orderHeaders: [
        { text: 'ID', value: 'id' },
        { text: 'User ID', value: 'userId' },
        { text: 'Order', value: 'order' },
        { text: 'Actions', value: 'actions', sortable: false },
      ]
    }
  },
  mounted() {
    this.fetchUsers();
    this.fetchOrders();
  },
  methods: {
    async fetchUsers() {
      const response = await fetch('http://localhost:3333/users');
      this.users = await response.json();
    },
    async fetchOrders() {
      const response = await fetch('http://localhost:3333/orders');
      this.orders = await response.json();
    },
    async editUser(user) {
      const newName = prompt('Edit User Name:', user.fullName);
      const newEmail = prompt('Edit User Email:', user.email);
      if (newName && newEmail) {
        const response = await fetch(`http://localhost:3333/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fullName: newName, email: newEmail })
        });
        if (response.ok) {
          this.fetchUsers(); // Refresh the users list
        }
      }
    },
    async deleteUser(userId) {
      if (confirm('Are you sure you want to delete this user?')) {
        const response = await fetch(`http://localhost:3333/users/${userId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          this.fetchUsers(); // Refresh the users list
        }
      }
    },
    async editOrder(order) {
      const newOrder = prompt('Edit Order:', order.order);
      if (newOrder) {
        const response = await fetch(`http://localhost:3333/orders/${order.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ order: newOrder })
        });
        if (response.ok) {
          this.fetchOrders(); // Refresh the orders list
        }
      }
    },
    async deleteOrder(orderId) {
      if (confirm('Are you sure you want to delete this order?')) {
        const response = await fetch(`http://localhost:3333/orders/${orderId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          this.fetchOrders(); // Refresh the orders list
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
