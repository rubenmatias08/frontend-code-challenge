<template>
  <v-container>
    <v-select
      v-model="selectedUser"
      :items="users"
      item-text="fullName"
      item-value="id"
      label="Select User"
      required
      @change="fetchUserOrders"
    ></v-select>

    <v-data-table
      :headers="headers"
      :items="orders"
      item-value="id"
      class="elevation-1"
      :search="search"
    >
    </v-data-table>
    
    <v-text-field
      v-model="search"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
  </v-container>
</template>

<script>
import { UserService } from '@/services/UserService';

export default {
  data() {
    return {
      users: [],
      orders: [],
      selectedUser: null,
      search: '',
      headers: [
        { text: 'Name', value: 'fullName' },
        { text: 'e-Mail', value: 'email' },
        { text: 'Orders', value: 'orders' }
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
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchUserOrders() {
      try {
        const response = await UserService.fetchOrders(this.selectedUser);
        this.orders = response.length ? response : [{ order: 'No Orders' }];
      } catch (error) {
        console.error('Error fetching user orders:', error);
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
