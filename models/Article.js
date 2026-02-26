import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  previewContent: {
    type: String, // محتوای رایگان (پیش‌نمایش)
    default: '',
  },
  fileUrl: {
    type: String, // لینک فایل در GitHub یا Cloudinary
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    default: 'عمومی',
  },
  tags: [String],
  coverImage: {
    type: String,
    default: '',
  },
  downloadCount: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema)
