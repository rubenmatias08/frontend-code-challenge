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
