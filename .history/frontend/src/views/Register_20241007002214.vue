<template>
    <v-container>
      <v-form @submit.prevent="registerUser">
        <v-text-field v-model="name" label="Name" required></v-text-field>
        <v-text-field v-model="email" label="Mail" required></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
        <v-btn type="submit" color="success">Register User</v-btn>
        <v-alert v-if="userMessage" type="success" dismissible>{{ userMessage }}</v-alert>
        <v-divider></v-divider>
        <v-select v-model="selectedUser" :items="users" item-text="name" item-value="id" label="Select User" required></v-select>
        <v-text-field v-model="order" label="Order" required></v-text-field>
        <v-btn @click="registerOrder" color="success">Register Order</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        order: '',
        selectedUser: null,
        users: [],
        userMessage: ''
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
      async registerUser() {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.name, email: this.email, password: this.password })
        });
        if (response.ok) {
          this.userMessage = 'Successfully registered';
          setTimeout(() => {
            this.userMessage = '';
            this.$router.push({ name: 'Database' });
          }, 120000);
        }
      },
      async registerOrder() {
        const response = await fetch('http://localhost:3000/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: this.selectedUser, order: this.order })
        });
        if (response.ok) {
          this.userMessage = 'Successfully registered order';
          setTimeout(() => {
            this.userMessage = '';
            this.$router.push({ name: 'Database' });
          }, 120000);
        }
      }
    }
  }
  </script>
  