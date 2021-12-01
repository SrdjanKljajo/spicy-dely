import Category from '../models/Category.js'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'

const getAllCategories = async (req, res) => {
  const categories = await Category.find()
  res.status(StatusCodes.OK).json({ categories, count: categories.length })
}

const getProductCategories = async (req, res) => {
  const productID = req.params.productId
  if (productID) {
    const categories = await Category.find({ product: productID })
    res.status(StatusCodes.OK).json({ categories, count: categories.length })
  } else {
    throw new CustomError.NotFoundError(`Product with ${productID} not found`)
  }
}

const createCategory = async (req, res) => {
  const category = await Category.create({ ...req.body })
  res
    .status(StatusCodes.CREATED)
    .json({ category: { name: category.name, slug: category.slug } })
}

export { getProductCategories, getAllCategories, createCategory }
