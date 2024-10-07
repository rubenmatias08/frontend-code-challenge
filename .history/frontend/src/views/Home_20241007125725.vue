<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <div class="main-container">
          <v-btn @click="goToRegister" color="primary" class="mx-4">Register</v-btn>
          <v-btn @click="goToDatabase" color="secondary" class="mx-4">Database</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <div class="quote-container">
          <p class="quote">"Success usually comes to those who are too busy to be looking for it."</p>
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
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.main-container {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.quote-container {
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.quote {
  font-family: 'Courier New', Courier, monospace; /* Change this to your desired font */
  font-size: 1.2em;
  color: #333; /* Adjust color to match your theme */
  margin-top: 10px;
}
</style>
