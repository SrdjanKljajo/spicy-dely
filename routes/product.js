import { Router } from 'express'
const router = Router()

import {
  getAllProducts,
  getProductCategories,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.js'

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)
router.route('/:productId/categories').get(getProductCategories)

// Update All atributes at once
router.route('/:id').put(updateProduct)

export default router
