<template>
    <v-container>
      <v-form @submit.prevent="registerUser">
        <v-text-field v-model="name" label="Name" required></v-text-field>
        <v-text-field v-model="email" label="Mail" required></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
        <v-btn type="submit" color="success">Register User</v-btn>
        <v-alert v-if="userMessage" type="success" dismissible>{{ userMessage }}</v-alert>
        <v-divider></v-divider>
        <v-select
          v-model="selectedUser"
          :items="formattedUsers"
          item-text="name"
          item-value="id"
          label="Select User"
          required
        ></v-select>
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
        userMessage: '',
      };
    },
    mounted() {
      this.fetchUsers();
    },
    computed: {
      formattedUsers() {
        return this.users.map(user => ({
          id: user.id,
          name: user.name,
        }));
      },
    },
    methods: {
      async fetchUsers() {
        const response = await fetch('http://localhost:3333/users');
        if (response.ok) {
          this.users = await response.json();
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      },
      async registerUser() {
        const response = await fetch('http://localhost:3333/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: this.name, email: this.email, password: this.password }),
        });
        if (response.ok) {
          this.userMessage = 'Successfully registered';
          this.name = '';
          this.email = '';
          this.password = '';
          this.fetchUsers(); // Refresh user list after registration
          setTimeout(() => {
            this.userMessage = '';
            this.$router.push({ name: 'Database' });
          }, 120000);
        }
      },
      async registerOrder() {
        const response = await fetch('http://localhost:3333/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: this.selectedUser, order: this.order }),
        });
        if (response.ok) {
          this.userMessage = 'Successfully registered order';
          this.order = '';
          setTimeout(() => {
            this.userMessage = '';
            this.$router.push({ name: 'Database' });
          }, 120000);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  