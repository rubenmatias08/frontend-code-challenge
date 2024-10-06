<template>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        class="elevation-1"
        :search="search"
        @click:row="openEditDialog"
      >
        <template v-slot:top>
          <v-text-field v-model="search" label="Search" class="mx-4" />
        </template>
      </v-data-table>
  
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit User</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="editForm" v-model="valid">
              <v-text-field
                v-model="editedUser.name"
                label="Name"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="editedUser.email"
                label="Email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="editedUser.password"
                label="Password"
                type="password"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="updateUser">Update</v-btn>
            <v-btn color="grey" @click="dialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Orders', value: 'orders', sortable: false }
        ],
        users: [],
        search: '',
        dialog: false,
        editedUser: {},
        valid: false,
        nameRules: [
          v => !!v || 'Name is required',
        ],
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => v.length >= 6 || 'Password must be at least 6 characters long',
        ],
      }
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        const response = await fetch('http://localhost:3000/users');
        this.users = await response.json();
      },
      openEditDialog(user) {
        this.editedUser = { ...user }; // Create a copy of the user data
        this.dialog = true;
      },
      async updateUser() {
        const response = await fetch(`http://localhost:3000/users/${this.editedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.editedUser)
        });
        if (response.ok) {
          this.dialog = false;
          await this.fetchUsers(); // Refresh the user list
        } else {
          // Handle errors here
          console.error('Failed to update user');
        }
      },
    }
  }
  </script>
  