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
        :items="users"
        item-text="fullName"
        item-value="id"
        label="Select User"
        required>
      </v-select>

      <v-text-field v-model="order" label="Order" required></v-text-field>
      <v-btn @click="registerOrder" color="success">Register Order</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { UserService } from '@/services/UserService';

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
      const response = await UserService.fetchUsers();
      this.users = response;
    },
    async registerUser() {
      const response = await UserService.createUser({
        fullName: this.name,
        email: this.email,
        password: this.password
      });
      if (response) {
        this.userMessage = 'Successfully registered';
        this.name = '';
        this.email = '';
        this.password = '';
        this.fetchUsers();
        setTimeout(() => {
          this.userMessage = '';
         It seems you may be working on integrating Vue.js components to build a full-stack system for managing users and their associated orders. If you need further assistance with a specific aspect of the code, debugging, or additional features, feel free to ask!

If there's anything specific you'd like me to review or help with regarding the code provided, just let me know!
