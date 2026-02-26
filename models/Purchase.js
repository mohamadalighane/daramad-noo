import mongoose from 'mongoose'

const PurchaseSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  },
  articleTitle: String,
  buyerEmail: {
    type: String,
    required: true,
    lowercase: true,
  },
  buyerPhone: String,
  buyerTelegram: String, // آی‌دی تلگرام برای ارسال فایل
  amount: {
    type: Number,
    required: true,
  },
  authority: String,   // کد زرین‌پال
  refId: String,       // شماره تراکنش
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  downloadToken: {
    type: String,
    unique: true,
    sparse: true,
  },
  downloadTokenExpiry: Date,
  downloadCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Purchase || mongoose.model('Purchase', PurchaseSchema)
