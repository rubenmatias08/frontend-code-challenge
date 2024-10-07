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
            <v-list-item v-for="order in item.orders" :key="order.id">{{ order.order }}</v-list-item>
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
          { text: 'Full Name', value: 'fullName' },
          { text: 'Email', value: 'email' },
          { text: 'Orders', value: 'orders' },
        ],
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await fetch('http://localhost:3333/users');
          if (response.ok) {
            this.users = await response.json();
            this.users.forEach(user => {
              user.orders = []; // Initialize orders array if necessary
            });
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  