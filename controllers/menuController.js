const MenuItem = require('../models/menuItemModel');

// Add menu item
const addMenuItem = async (req, res) => {
  const { storeId } = req.params;
  const { name, description, price, availability } = req.body;

  try {
    const newItem = await MenuItem.create({
      storeId,
      name,
      description,
      price,
      availability
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ message: 'Error adding menu item', error: error.message });
  }
};

// Get menu for a store
const getMenu = async (req, res) => {
  const { storeId } = req.params;
  try {
    const menu = await MenuItem.find({ storeId });
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu', error });
  }
};

// Update menu item
const updateMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
};

// Delete menu item
const deleteMenuItem = async (req, res) => {
  const { storeId, itemId } = req.params;

  try {
    const deletedItem = await MenuItem.findOneAndDelete({ _id: itemId, storeId });
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { addMenuItem, getMenu, updateMenuItem, deleteMenuItem };
