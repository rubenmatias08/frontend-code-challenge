<template>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="usersWithOrders"
        item-key="id"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Users and Orders</v-toolbar-title>
            <v-divider inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              label="Search"
              solo
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:item.orders="{ item }">
          <span v-if="item.orders.length">{{ item.orders.join(', ') }}</span>
          <span v-else>No Orders</span>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: '',
        users: [],
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Full Name', value: 'fullName' },
          { text: 'Email', value: 'email' },
          { text: 'Orders', value: 'orders', sortable: false }
        ]
      }
    },
    computed: {
      usersWithOrders() {
        return this.users.map(user => {
          return {
            ...user,
            orders: user.orders || []  // Make sure orders are included
          }
        });
      }
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        const response = await fetch('http://localhost:3333/users');
        this.users = await response.json();
      }
    }
  }
  </script>
  