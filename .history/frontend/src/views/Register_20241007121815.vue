<template>
  <v-container>
    <h1>Register</h1>
    <v-form>
      <v-text-field label="Username" required></v-text-field>
      <v-text-field label="Email" required></v-text-field>
      <v-text-field label="Password" type="password" required></v-text-field>
      <v-btn color="primary">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.v-container {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
}
</style>
