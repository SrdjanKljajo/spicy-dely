const { StatusCodes } = require('http-status-codes')
const { Product } = require('../models')
//const { Category } = require('../models')

// @desc      Get products
// @route     GET /api/v1/product
const getAllProducts = async (req, res) => {
  const products = await Product.findAll()
  res.status(StatusCodes.OK).json({ products, count: products.length })
}

// @desc      Get single product
// @route     GET /api/v1/product/:id
const getProduct = async (req, res) => {
  const id = req.params.id
  const product = await Product.findOne({ where: { id } })
  if (!product) {
    res.status(StatusCodes.NOT_FOUND).send(`Product with id ${id} not found`)
  }
  res.status(StatusCodes.OK).json({ product })
}

// @desc      Create product
// @route     POST /api/v1/product
const createProduct = async (req, res) => {
  const { name } = req.body
  const productExist = Product.findOne({ where: { name } })
  if (productExist) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(`Product with name ${name} exist in database`)
  }
  const product = await Product.create(req.body)

  res.status(StatusCodes.CREATED).json({ product })
}

// @desc      Update all product atrributes at once
// @route     PUT /api/v1/product/:id
const updateProduct = async (req, res) => {
  const id = req.params.id
  const product = await Product.findOne({ where: { id } })
  if (!product) {
    res.status(StatusCodes.NOT_FOUND).send(`Product with id ${id} not found`)
  }

  const { name, sku, price, category_id } = req.body

  if (name === '' || sku === '' || price === '' || category_id === '') {
    res.status(StatusCodes.BAD_REQUEST).send('Fields cannot be empty')
  }

  product.set({ name, sku, price, category_id })
  await product.save()

  res.status(StatusCodes.OK).json({ product })
}

// @desc      Update single product atrribute
// @route     PATCH /api/v1/product/:id
const updateProductSingleAtribute = async (req, res) => {
  const id = req.params.id
  const product = await Product.findOne({ where: { id } })
  if (!product) {
    res.status(StatusCodes.NOT_FOUND).send(`Product with id ${id} not found`)
  }

  const { name, sku, price, category_id } = req.body

  if (name === '' || sku === '' || price === '' || category_id === '') {
    res.status(StatusCodes.BAD_REQUEST).send('Fields cannot be empty')
  }

  if (name) {
    product.name = name
    return product.save(), res.status(StatusCodes.OK).json({ name })
  }
  if (sku) {
    product.sku = sku
    return product.save(), res.status(StatusCodes.OK).json({ sku })
  }
  if (price) {
    product.price = price
    return product.save(), res.status(StatusCodes.OK).json({ price })
  }
  if (category_id) {
    product.category_id = category_id
    return product.save(), res.status(StatusCodes.OK).json({ category_id })
  }
}

// @desc      Delete product
// @route     DELETE /api/v1/product/:id
const deleteProduct = async (req, res) => {
  const id = req.params.id
  const product = await Product.findOne({ where: { id } })
  if (!product) {
    res.status(StatusCodes.NOT_FOUND).send(`Product with id ${id} not found`)
  }
  await product.destroy()
  res.status(StatusCodes.NO_CONTENT).send()
}

// @desc      Get categories by product
// @route     GET /api/v1/:productId/categories
/*const getProductCategories = async (req, res) => {
  const productID = req.params.productId
  if (productID) {
    const categories = await Category.findAll({ where: { product_id } })
    res.status(StatusCodes.OK).json({ categories, count: categories.length })
  } else {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(`Product with ${productID} not found`)
  }
}*/

module.exports = {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  updateProductSingleAtribute,
  getProduct,
  //getProductCategories,
}
