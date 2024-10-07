<template>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
          ></v-text-field>
        </template>
        <template v-slot:item.orders="{ item }">
          <v-list>
            <v-list-item v-for="(order, index) in item.orders" :key="index">
              {{ order.order }}
            </v-list-item>
          </v-list>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [],
        search: '',
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Name', value: 'fullName' }, // Make sure this matches your backend field
          { text: 'Email', value: 'email' },
          { text: 'Orders', value: 'orders' },
        ],
      };
    },
    mounted() {
      this.fetchUsersWithOrders();
    },
    methods: {
      async fetchUsersWithOrders() {
        try {
          const response = await fetch('http://localhost:3333/users');
          if (response.ok) {
            const users = await response.json();
            this.users = await Promise.all(users.map(async user => {
              const ordersResponse = await fetch(`http://localhost:3333/orders?userId=${user.id}`);
              const orders = await ordersResponse.json();
              return { ...user, orders }; // Attach orders to user object
            }));
          }
        } catch (error) {
          console.error('Error fetching users with orders:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  