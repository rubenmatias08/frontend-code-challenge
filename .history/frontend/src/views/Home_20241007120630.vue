<template>
  <v-container fluid fill-height>
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
      this.$router.push({ name: 'Register' });
    },
    goToDatabase() {
      this.$router.push({ name: 'Database' });
    },
  },
};
</script>

<style scoped>
body {
  background-image: url('@/assets/colorful-background.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.v-app-bar {
  background-color: #2b2b2b !important;
  color: white !important;
}

.v-btn {
  background-color: #1f1f1f !important;
  color: #fff !important;
}

.v-btn:hover {
  background-color: #3d3d3d !important;
}

.v-footer {
  background-color: #2b2b2b !important;
  color: #ffffff !important;
}
</style>
