<template>
  <v-container>
    <v-form ref="form" v-model="valid">
      <v-text-field v-model="fullName" label="Full Name" :rules="nameRules" required></v-text-field>
      <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
      <v-text-field v-model="order" label="Order" :rules="orderRules" required></v-text-field>
      <v-btn :disabled="!valid" @click="registerOrder">Register Order</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { UserService } from '@/services/UserService';

export default {
  data() {
    return {
      valid: false,
      fullName: '',
      email: '',
      order: '',
      nameRules: [v => !!v || 'Name is required'],
      emailRules: [v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      orderRules: [v => !!v || 'Order is required'],
    };
  },
  methods: {
    async registerOrder() {
      const user = await UserService.fetchUserByEmail(this.email); // Get user by email
      if (user) {
        await UserService.updateOrder(user.id, {
          orders: [...(user.orders || []), this.order], // Add new order to existing orders
        });
        this.$router.push({ name: 'Database' }); // Redirect to database page
      } else {
        alert('User not found! Please register the user first.');
      }
    }
  }
};
</script>

<style scoped>
v-container {
  padding: 20px;
}
</style>
