const API_URL = 'http://localhost:3333/users'

export const UserService = {
  async fetchUsers() {
    const response = await fetch(API_URL)
    return response.json()
  },

  async createUser(user) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    return response.json()
  },

  async updateUser(userId, user) {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    return response.json()
  },

  async deleteUser(userId) {
    await fetch(`${API_URL}/${userId}`, {
      method: 'DELETE',
    })
  },

  async fetchOrders(userId) {
    const response = await fetch(`${API_URL}/${userId}/orders`)
    return response.json()
  },

  async createOrder(order) {
    const response = await fetch('http://localhost:3333/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
    return response.json()
  },

  async deleteOrder(userId, orderId) {
    await fetch(`${API_URL}/${userId}/orders/${orderId}`, {
      method: 'DELETE',
    })
  },
}
