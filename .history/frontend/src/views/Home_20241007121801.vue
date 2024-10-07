<template>
  <v-container>
    <h1>Welcome to the Home Page</h1>
    <v-text-field v-model="search" label="Search Users"></v-text-field>
    <v-data-table
      :headers="headers"
      :items="filteredUsers"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Users List</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-pagination
            v-model="page"
            :length="pageCount"
            @input="updatePage"
          ></v-pagination>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      page: 1,
      users: [], // Fetch your users data here
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' }
      ]
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        return user.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    pageCount() {
      return Math.ceil(this.filteredUsers.length / 5);
    }
  },
  methods: {
    updatePage(newPage) {
      this.page = newPage;
    }
  }
};
</script>

<style scoped>
.v-container {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
}
</style>
