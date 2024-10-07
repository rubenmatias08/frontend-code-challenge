<template>
  <v-container>
    <v-form ref="form">
      <v-card class="mx-auto" max-width="500">
        <v-card-title>
          <span class="headline">Register</span>
        </v-card-title>
        
        <v-card-text>
          <v-text-field
            label="Full Name"
            v-model="fullName"
            :rules="[v => !!v || 'Name is required']"
            autocomplete="off"
            required
          ></v-text-field>

          <v-text-field
            label="Email"
            v-model="email"
            :rules="[v => !!v || 'Email is required']"
            autocomplete="new-email" 
            required
          ></v-text-field>

          <v-text-field
            label="Password"
            v-model="password"
            :rules="[v => !!v || 'Password is required']"
            type="password"
            autocomplete="new-password"
            required
          ></v-text-field>

          <v-select
            label="Select User Type"
            v-model="userType"
            :items="userTypes"
            item-text="name"
            item-value="value"
            :rules="[v => !!v || 'User type is required']"
            autocomplete="off"
            required
          ></v-select>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="submitForm">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      userType: '',
      userTypes: [
        { name: 'Admin', value: 'admin' },
        { name: 'User', value: 'user' },
      ],
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        console.log('Register form submitted:', {
          fullName: this.fullName,
          email: this.email,
          password: this.password,
          userType: this.userType,
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
