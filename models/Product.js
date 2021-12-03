import mongoose from 'mongoose'
import slugify from 'slugify'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'product name must be provided'],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    sku: {
      type: String,
      required: [true, 'sku must be provided'],
    },
    price: {
      type: Number,
      required: [true, 'product price must be provided'],
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please provide category'],
      },
    ],
  },
  { timestamps: true }
)

// Create slug for name
productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

export default mongoose.model('Product', productSchema)
