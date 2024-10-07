<template>
  <v-container>
    <v-text-field v-model="searchQuery" label="Search Users" @input="searchUsers"></v-text-field>
    <v-data-table :headers="headers" :items="filteredUsers" item-value="id" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-btn @click="editUser(item)" text class="action-button">
          <v-icon left>mdi-pencil</v-icon>
        </v-btn>
        <v-btn @click="deleteUser(item)" text class="action-button">
          <v-icon left>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit User</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editedUser.fullName" label="Name"></v-text-field>
          <v-text-field v-model="editedUser.email" label="Email"></v-text-field>
          <v-text-field v-model="editedOrder" label="Order"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { UserService } from '@/services/UserService';

export default {
  data() {
    return {
      dialog: false,
      users: [],
      filteredUsers: [],
      editedUser: {},
      editedOrder: '',
      searchQuery: '',
      headers: [
        { text: 'Name', value: 'fullName' },
        { text: 'Email', value: 'email' },
        { text: 'Orders', value: 'orders' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const response = await UserService.fetchUsers();
      this.users = response;
      this.filteredUsers = response;
    },
    searchUsers() {
      this.filteredUsers = this.users.filter(user =>
        user.fullName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    editUser(user) {
      this.editedUser = { ...user };
      this.editedOrder = user.orders || '';
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    async saveUser() {
      await UserService.updateUser(this.editedUser.id, {
        fullName: this.editedUser.fullName,
        email: this.editedUser.email,
      });
      await UserService.updateOrder(this.editedUser.id, {
        order: this.editedOrder,
      });
      this.dialog = false;
      this.fetchUsers();
    },
    async deleteUser(user) {
      await UserService.deleteUser(user.id);
      this.fetchUsers();
    }
  }
};
</script>

<style scoped>
v-container {
  background-color: #f5f5f5;
  padding: 20px;
}

.v-data-table-header th {
  background-color: #2196F3;
  color: white;
}

.v-dialog .v-card {
  background-color: #fff;
}

.action-button {
  margin-right: 4px; 
}
</style>
