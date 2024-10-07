<template>
  <v-container>
    <v-data-table :headers="headers" :items="users" item-value="id" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="editUser(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteUser(item)">
          <v-icon>mdi-delete</v-icon>
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
export default {
  data() {
    return {
      dialog: false,
      users: [],
      editedUser: {},
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'fullName' },
        { text: 'Email', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    };
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
    editUser(user) {
      this.editedUser = { ...user };
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    async saveUser() {
      try {
        const response = await fetch(`http://localhost:3333/users/${this.editedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.editedUser)
        });
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
        this.dialog = false;
        await this.fetchUsers();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    async deleteUser(user) {
      try {
        const response = await fetch(`http://localhost:3333/users/${user.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        await this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  }
};
</script>

<style scoped></style>
