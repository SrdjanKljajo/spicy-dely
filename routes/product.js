import { Router } from 'express'
const router = Router()

import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductSingleAtribute,
} from '../controllers/product.js'

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:slug').get(getProduct).delete(deleteProduct)

// Update single atribute
router.route('/:slug').patch(updateProductSingleAtribute)

// Update All atributes at once
router.route('/:slug').put(updateProduct)

export default router
