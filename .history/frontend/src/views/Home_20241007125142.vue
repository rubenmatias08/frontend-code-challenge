<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <img src="/frontend/src/assets/hansecom-logo.png" alt="Logo" class="logo" />
        <div class="main-container">
          <v-btn @click="goToRegister" color="primary" class="mx-4">Register</v-btn>
          <v-btn @click="goToDatabase" color="secondary" class="mx-4">Database</v-btn>
        </div>
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
.logo {
  max-width: 100%; /* Responsive logo */
  height: auto; /* Maintain aspect ratio */
  margin-bottom: 20px; /* Space between logo and buttons */
}

.main-container {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
