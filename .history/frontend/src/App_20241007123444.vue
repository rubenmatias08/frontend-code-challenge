<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Mind your Business</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="$router.push('/')">Home</v-btn>
      <v-btn text @click="$router.push('/register')">Register</v-btn>
      <v-btn text @click="$router.push('/database')">Database</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <span class="white--text">© 2024 HanseCom</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
.v-app-bar {
  background: linear-gradient(to right,#0a970a, #5ff42d);
  color: #ffffff;
}

.v-footer {
  background: linear-gradient(to right, #424242, #757575);
  color: white;
}
</style>

