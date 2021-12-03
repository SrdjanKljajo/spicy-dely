import Product from '../models/Product.js'
import Category from '../models/Category.js'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'

const getAllProducts = async (req, res) => {
  const products = await Product.find().sort('createdAt')
  res.status(StatusCodes.OK).json({ products, count: products.length })
}
const getProduct = async (req, res) => {
  const id = req.params.id
  const product = await Product.findById(id)
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id ${id}`)
  }
  res.status(StatusCodes.OK).json({ product })
}

const getProductCategories = async (req, res) => {
  const productID = req.params.productId
  if (productID) {
    const categories = await Category.find({ products: productID })
    res.status(StatusCodes.OK).json({ categories, count: categories.length })
  } else {
    throw new CustomError.NotFoundError(`Product with ${productID} not found`)
  }
}

const createProduct = async (req, res) => {
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}

const updateProduct = async (req, res) => {
  const { name, sku, price, categories } = req.body

  if (name === '' || sku === '' || price === '' || categories === '') {
    throw new CustomError.BadRequestError('Fields cannot be empty')
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ product })
}

const deleteProduct = async (req, res) => {
  const productId = req.params.id
  const product = await Product.findByIdAndDelete(productId)
  if (!product) {
    throw new CustomError.NotFoundError(`No job with id ${productId}`)
  }
  res.status(StatusCodes.OK).send()
}

export {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getProduct,
  getProductCategories,
}
