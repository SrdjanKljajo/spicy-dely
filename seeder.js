import { readFileSync } from 'fs'
import mongoose from 'mongoose'
const { connect } = mongoose
import dotenv from 'dotenv'
import path from 'path'

// Load env vars
dotenv.config({ path: './config/.env' })

// Load models
import Product from './models/Product.js'
import Category from './models/Category.js'

// Connect to DB
connect(process.env.MONGO_URI)

const __dirname = path.resolve()

// Read JSON files
const products = JSON.parse(
  readFileSync(`${__dirname}/_data/products.json`, 'utf-8')
)

const categories = JSON.parse(
  readFileSync(`${__dirname}/_data/categories.json`, 'utf-8')
)

// Import into DB
const importData = async () => {
  try {
    await Product.create(products)
    await Category.create(categories)
    console.log('Data Imported...')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Product.deleteMany()
    await Category.deleteMany()
    console.log('Data Destroyed...')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
