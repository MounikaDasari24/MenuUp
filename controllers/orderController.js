const Order = require('../models/orderModel');

// Place a new order
const placeOrder = async (req, res) => {
  const { storeId } = req.params;
  const { items, totalAmount } = req.body;

  try {
    console.log('Order data received in backend:', req.body);
    const newOrder = await Order.create({
      storeId,
      items,
      totalAmount
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error in placeOrder:', error);
    res.status(500).json({ message: 'Error placing order', error });
  }
};

// Get all orders for a store
const getOrders = async (req, res) => {
  const { storeId } = req.params;

  try {
    const orders = await Order.find({ storeId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};

module.exports = { placeOrder, getOrders, updateOrderStatus };
