import crypto from 'crypto';
import Razorpay from 'razorpay';
import Payment from '../models/Payment.js';

let razorpay = null;

function getRazorpay() {
  if (!razorpay) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpay;
}

export async function createOrder(req, res) {
  try {
    const { plan_name, amount, currency, customer_name, customer_email, customer_phone } = req.body;

    if (!plan_name || !amount || !customer_name || !customer_email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const options = {
      amount: amount,
      currency: currency || 'INR',
      receipt: `rcpt_${Date.now()}`,
      notes: {
        plan_name,
        customer_name,
        customer_email,
      },
    };

    const order = await getRazorpay().orders.create(options);

    await Payment.create({
      razorpay_order_id: order.id,
      plan_name,
      amount,
      currency: currency || 'INR',
      customer_name,
      customer_email,
      customer_phone: customer_phone || '',
      status: 'created',
    });

    return res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to create order' });
  }
}

export async function verifyPayment(req, res) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing verification fields' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      await Payment.updateOne(
        { razorpay_order_id },
        {
          $set: {
            status: 'paid',
            razorpay_payment_id,
            razorpay_signature,
          },
        }
      );

      return res.json({ verified: true, message: 'Payment verified successfully' });
    } else {
      await Payment.updateOne(
        { razorpay_order_id },
        { $set: { status: 'failed', razorpay_payment_id } }
      );

      return res.status(400).json({ verified: false, error: 'Signature verification failed' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Verification failed' });
  }
}
