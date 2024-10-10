<template>
  <v-container>
    <v-container>
      <v-text-field
        v-model="userSearchQuery"
        label="Search Users"
        append-icon="mdi-magnify"
        @keyup="filterUsers"
      />
      <v-data-table
        :headers="userTableHeaders"
        :items="userSearchResults"
        item-value="id"
        class="elevation-1"
      >
      <template v-slot:[`item.actions`]="{ item }">
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
            <v-btn color="blue darken-1" text @click="updateUser">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

    <v-divider></v-divider>

    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="orderSearchQuery" label="Query" required />
        </v-col>
        <v-col>
          <v-select
            v-model="orderSearchBy"
            :items="orderSearchByOptions"
            label="Criteria"
            required
          ></v-select>
        </v-col>
        <v-col>
          <v-btn @click="searchOrders" color="primary">Search</v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="orderTableHeaders"
        :items="orderSearchResults"
        item-value="id"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon @click="editOrder(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteOrder(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      users: [],
      editedUser: {},
      userTableHeaders: [
        { title: 'User ID', value: 'id' },
        { title: 'Name', value: 'fullName' },
        { title: 'Email', value: 'email' },
        { title: 'Orders', value: 'orders' },
        { title: 'Actions', value: 'actions', sortable: false },
      ],
      userSearchQuery: '',
      userSearchResults: [],
      orderTableHeaders: [
        { title: 'Order ID', value: 'id' },
        { title: 'User ID', value: 'user_id' },
        { title: 'Order Date', value: 'order_date' },
        { title: 'Product', value: 'product' },
        { title: 'Created', value: 'created_at' },
        { title: 'Updated', value: 'updated_at' },
        { title: 'Actions', value: 'actions', sortable: false },
      ],
      orderSearchQuery: '',
      orderSearchBy: 'Order ID',
      orderSearchByOptions: ['User ID', 'Order ID'],
      orderSearchResults: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch("http://localhost:3333/users");
        this.users = await response.json();
        this.userSearchResults = this.users;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    filterUsers() {
      if (this.userSearchQuery) {
        this.userSearchResults = this.users.filter((user) =>
          user.fullName.toLowerCase().includes(this.userSearchQuery.toLowerCase())
        );
      } else {
        this.userSearchResults = this.users;
      }
    },
    editUser(user) {
      this.editedUser = { ...user };
      this.dialog = true;
    },
    async searchOrders() {
      switch (this.orderSearchBy) {
        case "User ID":
          try {
            const response = await fetch(
              `http://localhost:3333/orders/${this.orderSearchQuery}`
            );
            const result = await response.json();
            this.orderSearchResults = [result];
          } catch (error) {
            console.error("Error fetching orders:", error);
          }
          break;
        case "Order ID":
          try {
            const response = await fetch(
              `http://localhost:3333/order/${this.orderSearchQuery}`
            );
            const result = await response.json();
            this.orderSearchResults = [result];
          } catch (error) {
            console.error("Error fetching orders:", error);
          }
          break;
        default:
          break;
      }
    },
    closeDialog() {
      this.dialog = false;
    },
    
    async updateUser() {
      try {
        const response = await fetch(
          `http://localhost:3333/users/${this.editedUser.id}/edit`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullName: this.editedUser.fullName,
              email: this.editedUser.email,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update user");
        }
        this.dialog = false;
        await this.fetchUsers();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    async deleteUser(user) {
      try {
        const response = await fetch(
          `http://localhost:3333/users/${user.id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        await this.fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
    async updateOrder(order) {
      try {
        const response = await fetch(
          `http://localhost:3333/order/${order.id}/edit`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete order");
        }
        await this.fetchUsers();
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    },
    async deleteOrder(order) {
      try {
        const response = await fetch(
          `http://localhost:3333/orders/${order.id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete order");
        }
        await this.fetchUsers();
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    },
    
  },
};
</script>

<style scoped></style>
