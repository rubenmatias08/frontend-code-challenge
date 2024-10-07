<template>
    <v-container>
      <v-form @submit.prevent="registerUser">
        <v-text-field v-model="user.name" label="Name" required />
        <v-text-field v-model="user.email" label="Email" required />
        <v-text-field v-model="user.password" label="Password" type="password" required />
        <v-btn type="submit" color="primary">Register User</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          name: '',
          email: '',
          password: '',
        },
      };
    },
    methods: {
      async registerUser() {
        try {
          const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.user),
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          this.$router.push('/database'); // Redirect to database page
          alert('Successfully registered');
        } catch (error) {
          console.error('Failed to register user:', error);
          alert('Failed to register user. Please try again.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  