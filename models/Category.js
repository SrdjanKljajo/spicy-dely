import mongoose from 'mongoose'
import slugify from 'slugify'

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'category name must be provided'],
      maxlength: 32,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
)

// Create slug for name
categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

export default mongoose.model('Category', categorySchema)
