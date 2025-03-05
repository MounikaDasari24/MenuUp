const express = require('express');
const {
  placeOrder,
  getOrders,
  updateOrderStatus
} = require('../controllers/orderController');

const router = express.Router();

router.post('/:storeId/orders', placeOrder);
router.get('/:storeId/orders', getOrders);
router.put('/orders/:orderId', updateOrderStatus);

router.get('/test', (req, res) => {
    res.send('Order test route works!');
  });  

module.exports = router;
