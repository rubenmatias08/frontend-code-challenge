<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>My Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="$router.push({ name: 'Home' })">Home</v-btn>
      <v-btn text @click="$router.push({ name: 'Register' })">Register</v-btn>
      <v-btn text @click="$router.push({ name: 'Database' })">Database</v-btn>
    </v-app-bar>

    <router-view></router-view>

    <v-footer app>
      <span>&copy; 2024 My Application</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
body {
  background: linear-gradient(to right, #b2f2a3, #4da376);
  min-height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.v-app-bar {
  background-color: #2b2b2b !important;
  color: white !important;
}

.v-footer {
  background-color: #2b2b2b !important;
  color: #ffffff !important;
}
</style>
