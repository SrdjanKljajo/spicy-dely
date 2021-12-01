import 'express-async-errors'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import compression from 'compression'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp'
import cors from 'cors'
import path from 'path'

dotenv.config({ path: './config/.env' })

// Connect with database
connectDB()

const app = express()

// Import files
import product from './routes/product.js'
import category from './routes/category.js'

// MIDDLEWARES
import notFound from './middlewares/not-found-route.js'
import mongooseErrors from './middlewares/error-mongoose.js'

// Body parser
app.use(express.json())

// Compress all HTTP responses
app.use(compression())

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

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Static folder
const __dirname = path.resolve()
app.use(express.static(`${__dirname}/public/`))

// import routes
app.use('/api/v1/product', product)
app.use('/api/v1/category', category)

// Not found route
app.use(notFound)

// Database errors
app.use(mongooseErrors)

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
