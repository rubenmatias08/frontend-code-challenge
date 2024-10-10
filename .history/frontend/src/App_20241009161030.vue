<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>HanseCom</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="$router.push('/')">Home</v-btn>
      <v-btn text @click="$router.push('/register')">Register</v-btn>
      <v-btn text @click="$router.push('/database')">Database</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <span class="white--text">© 2024 Rúben Matias</span>
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
  background: linear-gradient(to right,#02AABD, #00CDAC);
  color: #ffffff;
}

.v-footer {
  background: linear-gradient(to right, #007B74, #00CDAC);
  color: #ffffff;
}
</style>