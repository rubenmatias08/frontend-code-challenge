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
        item-title="fullName"
        item-value="id"
        label="Select User"
        required
      >
      </v-select>
      <v-text-field v-model="product" label="Product" required></v-text-field>
      <v-btn @click="createOrder" color="success">Create Order</v-btn>
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
      product: '',
      selectedUser: null,
      users: [],
      userMessage: '',
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3333/users')
        this.users = await response.json()
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    async registerUser() {
      try {
        const response = await fetch('http://localhost:3333/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fullName: this.name, email: this.email, password: this.password }),
        })
        if (response.ok) {
          this.userMessage = 'Successfully registered'
          this.name = ''
          this.email = ''
          this.password = ''
          await this.fetchUsers()
          setTimeout(() => {
            this.userMessage = ''
            this.$router.push({ name: 'Database' })
          }, 2000)
        }
      } catch (error) {
        console.error('Error registering user:', error)
      }
    },
    async createOrder() {
      try {
        console.log(JSON.stringify({ userId: this.selectedUser, orderDate: new Date(), product: this.product }))
        const response = await fetch('http://localhost:3333/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: this.selectedUser, orderDate: new Date(), product: this.product }),
        })
        if (response.ok) {
          this.userMessage = 'Successfully registered order'
          this.order = ''
          setTimeout(() => {
            this.userMessage = ''
            this.$router.push({ name: 'Database' })
          }, 2000)
        }
      } catch (error) {
        console.error('Error registering order:', error)
      }
    },
  },
}
</script>

<style scoped></style>