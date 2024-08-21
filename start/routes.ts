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

router.resource('users', UsersController)
router.get('orders/:id', [OrdersController, 'index'])
router.post('orders', [OrdersController, 'store'])
router.delete('orders/:id', [OrdersController, 'destroy'])
router.get('order/:id', [OrdersController, 'show'])
router.put('order/:id/edit', [OrdersController, 'edit'])
