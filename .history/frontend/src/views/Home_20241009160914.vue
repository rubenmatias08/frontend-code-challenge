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
          <p class="quote">Welcome to Business Manager</p>
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
.main-container {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.quote-container {
  margin-top: 20px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 600px; 
  margin-left: auto; 
  margin-right: auto; 
}

.quote {
  font-family: 'Georgia', serif; 
  font-size: 1.5em; 
  color: #ffffff; 
  text-align: center; 
  line-height: 1.5;
}

.quote-container {
  background: linear-gradient(to right,#02AABD, #00CDAC)
}
</style>