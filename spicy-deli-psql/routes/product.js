const express = require('express')

const router = express.Router()
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  updateProductSingleAtribute,
  deleteProduct,
  getProductCategories,
} = require('../controllers/product')

router.route('/').get(getAllProducts).post(createProduct)
router
  .route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .patch(updateProductSingleAtribute)
  .delete(deleteProduct)
router.route('/:productId/categories').get(getProductCategories)

module.exports = router
