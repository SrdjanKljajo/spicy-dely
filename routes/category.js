import { Router } from 'express'
const router = Router()

import {
  getAllCategories,
  getProductCategories,
  createCategory,
} from '../controllers/category.js'

router.route('/').get(getAllCategories).post(createCategory)
router.route('/:productId/:categoryId').get(getProductCategories)

export default router
