import { Router } from 'express'
const router = Router()

import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductSingleAtribute,
  getProductCategories,
} from '../controllers/product.js'

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:slug').get(getProduct).delete(deleteProduct)

// Get product categories
router.route('/:slug/categories').get(getProductCategories)

// Update single atribute
router.route('/:slug').patch(updateProductSingleAtribute)

// Update All atributes at once
router.route('/:slug').put(updateProduct)

export default router
