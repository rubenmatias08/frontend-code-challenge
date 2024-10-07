<template>
  <v-container>
    <!-- User Management Table -->
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
        <v-btn icon @click="openEditUserDialog(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteUser(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-divider></v-divider>

    <!-- Order Management Table -->
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

    <!-- Edit User Dialog -->
    <v-dialog v-model="editUserDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit User</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editedUser.fullName" label="Name" required />
          <v-text-field v-model="editedUser.email" label="Email" required />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="editUserDialog = false">Cancel</v-btn>
          <v-btn text @click="updateUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      ],
      editUserDialog: false,
      editedUser: {
        id: null,
        fullName: '',
        email: ''
      }
    }
  },
  mounted() {
    this.fetchUsers();
    this.fetchOrders();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3333/users');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        this.users = Array.isArray(data) ? data : [];
      } catch (error) {
        console.error('Error fetching users:', error);
        this.users = [];
      }
    },
    async fetchOrders() {
      try {
        const response = await fetch('http://localhost:3333/orders');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        this.orders = Array.isArray(data) ? data : [];
      } catch (error) {
        console.error('Error fetching orders:', error);
        this.orders = [];
      }
    },
    openEditUserDialog(user) {
      this.editedUser = { ...user }; // Create a copy of the user to edit
      this.editUserDialog = true; // Open the dialog
    },
    async updateUser() {
      const response = await fetch(`http://localhost:3333/users/${this.editedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: this.editedUser.fullName,
          email: this.editedUser.email
        })
      });
      if (response.ok) {
        this.fetchUsers(); // Refresh the users list
        this.editUserDialog = false; // Close the dialog
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
