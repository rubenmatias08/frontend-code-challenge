<template>
  <v-container>
    <v-card>
      <v-card-title>User Database</v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        item-value="id"
        class="elevation-1"
      >
        <template v-slot:item.orders="{ item }">
          <ul>
            <li v-for="order in item.orders" :key="order">{{ order }}</li>
          </ul>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn color="primary" @click="editUser(item)">Edit</v-btn>
          <v-btn color="red" @click="deleteUser(item.id)">Delete User</v-btn>
          <v-btn color="orange" @click="deleteOrders(item.id)">Delete Orders</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { UserService } from '@/services/UserService';

export default {
  data() {
    return {
      users: [],
      headers: [
        { text: 'Name', value: 'fullName' },
        { text: 'Mail', value: 'email' },
        { text: 'Orders', value: 'orders' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await UserService.fetchUsers();
        this.users = response;
        for (const user of this.users) {
          user.orders = await UserService.fetchOrders(user.id);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async editUser(user) {
      try {
        const updatedUser = { fullName: 'New Name', email: 'newemail@example.com' }; // Example
        await UserService.updateUser(user.id, updatedUser);
        this.fetchUsers(); 
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    async deleteUser(userId) {
      try {
        await UserService.deleteUser(userId);
        this.fetchUsers(); 
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    async deleteOrders(userId) {
      try {
        const orders = await UserService.fetchOrders(userId);
        for (const order of orders) {
          await UserService.deleteOrder(userId, order.id);
        }
        this.fetchUsers();
      } catch (error) {
        console.error('Error deleting orders:', error);
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}
</style>
