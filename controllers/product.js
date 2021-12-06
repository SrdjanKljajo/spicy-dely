import Product from '../models/Product.js'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'

// @desc      Get products
// @route     GET /api/v1/product
const getAllProducts = async (req, res) => {
  const products = await Product.find().sort('createdAt')
  res.status(StatusCodes.OK).json({ products, count: products.length })
}

// @desc      Get single product
// @route     GET /api/v1/product/:slug
const getProduct = async (req, res) => {
  const slug = req.params.slug
  const product = await Product.findOne({ slug })
  if (!product) {
    throw new CustomError.NotFoundError(`Product ${slug} not found`)
  }
  res.status(StatusCodes.OK).json({ product })
}

// @desc      Get single product
// @route     GET /api/v1/product/:slug/categories
const getProductCategories = async (req, res) => {
  const slug = req.params.slug
  const product = await Product.findOne({ slug })
  const productCategories = product.categories
  if (!product) {
    throw new CustomError.NotFoundError(`Product ${slug} not found`)
  }
  res.status(StatusCodes.OK).json({ productCategories })
}

// @desc      Create product
// @route     POST /api/v1/product
const createProduct = async (req, res) => {
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}

// @desc      Update all product atrributes at once
// @route     PUT /api/v1/product/:slug
const updateProduct = async (req, res) => {
  const { name, sku, price, categories } = req.body

  if (name === '' || sku === '' || price === '' || categories.length === 0) {
    throw new CustomError.BadRequestError('Fields cannot be empty')
  }

  const product = await Product.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )
  if (!product) {
    throw new CustomError.NotFoundError(`Product ${req.params.slug} not found`)
  }

  res.status(StatusCodes.OK).json({ product })
}

// @desc      Update single product atrribute
// @route     PATCH /api/v1/product/:slug
const updateProductSingleAtribute = async (req, res) => {
  const { name, sku, price, categories } = req.body

  const product = await Product.findOneAndUpdate(
    { slug: req.params.slug },
    { name, sku, price, categories },
    {
      new: true,
      runValidators: true,
    }
  )
  if (!product) {
    throw new CustomError.NotFoundError(`Product ${req.params.slug} not found`)
  }

  name && res.status(StatusCodes.OK).json({ name })

  sku && res.status(StatusCodes.OK).json({ sku })

  price && res.status(StatusCodes.OK).json({ price })

  categories && res.status(StatusCodes.OK).json({ categories })
}

// @desc      Delete product
// @route     DELETE /api/v1/product/:slug
const deleteProduct = async (req, res) => {
  const productSlug = req.params.slug
  const product = await Product.findOneAndDelete({
    slug: req.params.slug,
  })
  if (!product) {
    throw new CustomError.NotFoundError(`No product ${productSlug}`)
  }
  res.status(StatusCodes.NO_CONTENT).send()
}

export {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  updateProductSingleAtribute,
  getProduct,
  getProductCategories,
}
