<template>
  <v-container>
    <v-form @submit.prevent="fetchUserOrders">
      <v-select
        v-model="selectedUser"
        :items="users"
        item-text="fullName"
        item-value="id"
        label="Select User"
        required>
      </v-select>
      <v-btn type="submit" color="success">Fetch Orders</v-btn>
    </v-form>

    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      class="elevation-1">
      <template v-slot:item.orders="{ item }">
        <span v-for="order in item.orders" :key="order.id">{{ order.product }}</span>
      </template>
    </v-data-table>

    <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
  </v-container>
</template>

<script>
import { UserService } from '@/services/UserService'

export default {
  data() {
    return {
      selectedUser: null,
      users: [],
      headers: [
        { text: 'Name', value: 'fullName' },
        { text: 'e-Mail', value: 'email' },
        { text: 'Orders', value: 'orders' },
      ],
      search: '',
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await UserService.fetchUsers()
        this.users = response
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    async fetchUserOrders() {
      try {
        const response = await UserService.fetchOrders(this.selectedUser)
        const userIndex = this.users.findIndex((user) => user.id === this.selectedUser)
        if (userIndex !== -1) {
          this.$set(this.users[userIndex], 'orders', response)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    },
  },
}
</script>

<style scoped>
.v-container {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}
</style>
