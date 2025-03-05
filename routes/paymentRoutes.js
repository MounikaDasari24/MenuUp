const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/paymentController');

router.post('/order', createOrder);
router.get('/test', (req, res) => res.send('Payment route works!'));
console.log('🚦 Payment routes loaded');

module.exports = router;
