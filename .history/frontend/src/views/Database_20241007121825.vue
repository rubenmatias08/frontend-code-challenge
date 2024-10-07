<template>
  <v-container>
    <h1>Database Page</h1>
    <v-data-table
      :headers="orderHeaders"
      :items="orders"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      orders: [], // Fetch your orders data here
      orderHeaders: [
        { text: 'Order ID', value: 'orderId' },
        { text: 'User', value: 'user' },
        { text: 'Amount', value: 'amount' }
      ]
    };
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
