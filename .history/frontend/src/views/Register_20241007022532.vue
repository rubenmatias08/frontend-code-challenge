<template>
  <v-container>
    <v-form @submit.prevent="registerUser">
      <v-text-field v-model="name" label="Name" required></v-text-field>
      <v-text-field v-model="email" label="Mail" required></v-text-field>
      <v-text-field 
        v-model="password" 
        label="Password" 
        type="password" 
        required 
        :value="''" <!-- this ensures the password field is always empty -->
      ></v-text-field>
      <v-btn type="submit" color="success">Register User</v-btn>
      <v-alert v-if="userMessage" type="success" dismissible>{{ userMessage }}</v-alert>
      <v-divider></v-divider>
      <v-select
        v-model="selectedUser"
        :items="users"
        item-text="fullName"
        item-value="id"
        label="Select User"
        required
        return-object <!-- ensures that the entire object is passed -->
        @change="onUserSelect" <!-- custom method when user is selected -->
      ></v-select>
      <v-text-field v-model="order" label="Order" required></v-text-field>
      <v-btn @click="registerOrder" color="success">Register Order</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      order: '',
      selectedUser: null,
      users: [],
      userMessage: ''
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3333/users');
        this.users = await response.json();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async registerUser() {
      try {
        const response = await fetch('http://localhost:3333/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: this.name,
            email: this.email,
            password: this.password
          }),
        });
        if (response.ok) {
          this.userMessage = 'Successfully registered';
          this.name = '';
          this.email = '';
          this.password = ''; // clear the form
          await this.fetchUsers();
        } else {
          throw new Error('Failed to register user');
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },
    async registerOrder() {
      try {
        const response = await fetch('http://localhost:3333/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: this.selectedUser.id, // use the selected user’s ID
            order: this.order
          }),
        });
        if (response.ok) {
          this.userMessage = 'Successfully registered order';
          this.order = ''; // clear order field
        } else {
          throw new Error('Failed to register order');
        }
      } catch (error) {
        console.error('Error registering order:', error);
      }
    },
    onUserSelect(selectedUser) {
      console.log('User selected:', selectedUser); // debug user selection
    }
  }
}
</script>

<style scoped></style>
