const UsersController = () => import('#controllers/users_controller')
const OrdersController = () => import('#controllers/orders_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return { hello: 'world' }
})

router.get('users', [UsersController, 'index'])
router.post('users', [UsersController, 'store'])
router.delete('users/:id', [UsersController, 'destroy'])
router.get('users/:id', [UsersController, 'show'])
router.put('users/:id/edit', [UsersController, 'edit'])
router.get('users/:id/orders', [OrdersController, 'index']) // Changed route for getting user orders
router.post('orders', [OrdersController, 'store'])
router.delete('orders/:id', [OrdersController, 'destroy'])
router.get('order/:id', [OrdersController, 'show'])
router.put('order/:id/edit', [OrdersController, 'edit'])
