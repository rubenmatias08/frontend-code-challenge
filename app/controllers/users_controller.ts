import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const users = await User.all()
    return users
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const formData = request.body()

    const user = await User.create({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    })

    return user
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const user = await db.from('users').where('id', params.id).first()
    delete user.password
    return user
  }

  /**
   * Edit individual record
   */
  async edit({ params, request }: HttpContext) {
    const formData = request.body()
    const user = await User.findOrFail(params?.id)
    user.fullName = formData.fullName
    user.email = formData.email
    user.password = formData.password
    await user.save()
    return user
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (user) {
      await user.delete()
    }

    response.status(204)
  }
}
