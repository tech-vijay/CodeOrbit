import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    razorpay_order_id: { type: String, required: true, unique: true },
    razorpay_payment_id: { type: String, default: null },
    razorpay_signature: { type: String, default: null },
    plan_name: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    customer_name: { type: String, required: true },
    customer_email: { type: String, required: true },
    customer_phone: { type: String, default: '' },
    status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
