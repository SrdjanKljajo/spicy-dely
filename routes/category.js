import { Router } from 'express'
const router = Router()

import { getAllCategories, createCategory } from '../controllers/category.js'

router.route('/').get(getAllCategories).post(createCategory)

export default router
