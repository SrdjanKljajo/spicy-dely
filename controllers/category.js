import Category from '../models/Category.js'
import { StatusCodes } from 'http-status-codes'

// @desc      Get categories
// @route     GET /api/v1/category
const getAllCategories = async (req, res) => {
  const categories = await Category.find()
  res.status(StatusCodes.OK).json({ categories, count: categories.length })
}

// @desc      Get categories by product
// @route     GET /api/v1/:productId/categories
const getProductCategories = async (req, res) => {
  const productID = req.params.productId
  if (productID) {
    const categories = await Category.find({ products: productID })
    res.status(StatusCodes.OK).json({ categories, count: categories.length })
  } else {
    throw new CustomError.NotFoundError(`Product with ${productID} not found`)
  }
}

// @desc      Post category
// @route     POST /api/v1/category
const createCategory = async (req, res) => {
  const category = await Category.create({ ...req.body })
  res
    .status(StatusCodes.CREATED)
    .json({ category: { name: category.name, slug: category.slug } })
}

export { getAllCategories, createCategory, getProductCategories }
