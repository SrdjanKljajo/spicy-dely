require('express-async-errors')
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')

// Uvoz dotenv varijabli
dotenv.config({ path: './config/.env' })

//Import route files
const product = require('./routes/product')
//const category = require('./routes/category')

const app = express()

// MIDDLEWARES

//not found route
const notFound = require('./middlewares/not-found')

// Body parser
app.use(express.json())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
})
app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(cors())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// import routes
app.use('/api/v1/product', product)
app.use(notFound)
//app.use('/api/v1/category', category)

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`Server run on ${process.env.NODE_ENV} mode, on port ${PORT}`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
