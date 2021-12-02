import Category from '../models/Category.js'
import { StatusCodes } from 'http-status-codes'

const getAllCategories = async (req, res) => {
  const categories = await Category.find()
  res.status(StatusCodes.OK).json({ categories, count: categories.length })
}

const createCategory = async (req, res) => {
  const category = await Category.create({ ...req.body })
  res
    .status(StatusCodes.CREATED)
    .json({ category: { name: category.name, slug: category.slug } })
}

export { getAllCategories, createCategory }
