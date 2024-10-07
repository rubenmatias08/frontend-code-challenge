<template>
  <v-container>
    <v-form @submit.prevent="registerUser">
      <v-text-field v-model="name" label="Name" required></v-text-field>
      <v-text-field v-model="email" label="Mail" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-btn type="submit" color="success">Register User</v-btn>
      <v-alert v-if="userMessage" type="success" dismissible>{{ userMessage }}</v-alert>
      <v-divider></v-divider>

      <v-select
        v-model="selectedUser"
        :items="users"
        item-text="fullName"  <!-- Changed this line -->
        item-value="id"
        label="Select User"
        required>
      </v-select>

      <v-text-field v-model="order" label="Order" required></v-text-field>
      <v-btn @click="registerOrder" color="success">Register Order</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { UserService } from '@/services/UserService'; 

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      order: '',
      selectedUser: null,
      users: [],
      userMessage: '',
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await UserService.fetchUsers();
        this.users = response;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async registerUser() {
      try {
        const newUser = {
          fullName: this.name,
          email: this.email,
          password: this.password,
        };
        const response = await UserService.createUser(newUser);
        if (response) {
          this.userMessage = 'Successfully registered';
          this.name = '';
          this.email = '';
          this.password = '';
          await this.fetchUsers(); // Refresh users
          setTimeout(() => {
            this.userMessage = '';
            this.$router.push({ name: 'Database' });
          }, 2000);
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },
    async registerOrder() {
      try {
        const orderData = {
          userId: this.selectedUser,
          order: this.order,
        };
        const response = await fetch('http://localhost:3333/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
        if (response.ok) {
          this.userMessage = 'Successfully registered order';
          this.order = '';
          setTimeout(() => {
            this.userMessage = '';
            this.$router.push({ name: 'Database' });
          }, 2000);
        }
      } catch (error) {
        console.error('Error registering order:', error);
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}
</style>
