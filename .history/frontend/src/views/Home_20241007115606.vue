<template>
  <v-container class="background">
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <v-btn @click="goToRegister" color="primary" class="mx-4">Register</v-btn>
        <v-btn @click="goToDatabase" color="secondary" class="mx-4">Database</v-btn>
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

<style scoped>
.background {
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 20px;
}
</style>
