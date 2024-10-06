<template>
    <v-container>
      <v-row>
        <v-col>
          <v-btn @click="goToRegister" color="primary">Register</v-btn>
          <v-btn @click="goToDatabase" color="secondary">Database</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    methods: {
      goToRegister() {
        this.$router.push({ name: 'Register' })
      },
      goToDatabase() {
        this.$router.push({ name: 'Database' })
      }
    }
  }
  </script>
  