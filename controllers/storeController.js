const Store = require('../models/storeModel');
const bcrypt = require('bcryptjs');

const registerStore = async (req, res) => {
  const { storeName, ownerName, email, password, phoneNo, upiId } = req.body;

  try {
    const existingStore = await Store.findOne({ email });
    if (existingStore) return res.status(400).json({ message: 'Store already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('New store being created:', { storeName, ownerName, email, phoneNo, upiId });

    const newStore = await Store.create({
      storeName,
      ownerName,
      email,
      password: hashedPassword,
      phoneNo,
      upiId,
    });

    res.status(201).json({ message: 'Store registered successfully', store: newStore });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const loginStore = async (req, res) => {
  const { email, password } = req.body;

  try {
    const store = await Store.findOne({ email });
    if (!store) return res.status(400).json({ message: 'Store not found' });

    const isMatch = await bcrypt.compare(password, store.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', storeId: store._id, upiId: store.upiId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// New getStoreById function
const getStoreById = async (req, res) => {
  const { storeId } = req.params;

  try {
    const store = await Store.findById(storeId);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    res.status(200).json({ storeName: store.storeName, upiId: store.upiId });
  } catch (error) {
    console.error('Error fetching store:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerStore, loginStore, getStoreById };
