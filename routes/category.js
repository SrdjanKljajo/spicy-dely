import { Router } from 'express'
const router = Router()

import {
  getAllCategories,
  createCategory,
  getProductCategories,
} from '../controllers/category.js'

router.route('/').get(getAllCategories).post(createCategory)
router.route('/:productId/categories').get(getProductCategories)

export default router
