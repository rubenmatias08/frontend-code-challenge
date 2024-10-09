/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const OrdersController = () => import('#controllers/orders_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('users', [UsersController, 'index'])
router.post('users', [UsersController, 'store'])
router.delete('users/:id', [UsersController, 'destroy'])
router.get('user/:id', [UsersController, 'show'])
router.put('user/:id/edit', [UsersController, 'edit'])
router.get('orders/:id', [OrdersController, 'index'])
router.post('orders', [OrdersController, 'store'])
router.delete('orders/:id', [OrdersController, 'destroy'])
router.get('order/:id', [OrdersController, 'show'])
router.put('order/:id/edit', [OrdersController, 'edit'])
