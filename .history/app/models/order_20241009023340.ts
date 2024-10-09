import Order from '#models/order'

export default class OrdersController {
  public async index({ response }) {
    const orders = await Order.query().preload('user')
    return response.status(200).json(orders)
  }

  public async store({ request, response }) {
    const { userId, product, orderDate } = request.only(['userId', 'product', 'orderDate'])
    const order = await Order.create({ userId, product, orderDate })
    return response.status(201).json(order)
  }

  public async show({ params, response }) {
    const order = await Order.find(params.id)
    if (order) {
      return response.status(200).json(order)
    }
    return response.status(404).json({ message: 'Order not found' })
  }

  public async destroy({ params, response }) {
    const order = await Order.find(params.id)
    if (order) {
      await order.delete()
      return response.status(204).send()
    }
    return response.status(404).json({ message: 'Order not found' })
  }
}
