const Razorpay = require('razorpay');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = async (req, res) => {
  console.log('🔥 Create order route hit!'); // Debugging log
  try {
    const { amount, currency = 'INR' } = req.body;

    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.status(201).json(order);
  } catch (error) {
    console.error('❌ Razorpay order creation failed:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

module.exports = { createOrder };
