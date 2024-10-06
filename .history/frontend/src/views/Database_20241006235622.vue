<template>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        class="elevation-1"
        :search="search"
        @click:row="editUser"
      >
        <template v-slot:top>
          <v-text-field v-model="search" label="Search" class="mx-4" />
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Orders', value: 'orders', sortable: false }
        ],
        users: [],
        search: ''
      }
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        const response = await fetch('http://localhost:3000/users');
        this.users = await response.json();
      },
      editUser(user) {
        // Implement your edit functionality
      }
    }
  }
  </script>
  