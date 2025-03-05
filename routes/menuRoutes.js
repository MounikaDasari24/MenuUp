const express = require('express');
const {
  addMenuItem,
  getMenu,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');

const router = express.Router();

router.post('/:storeId/menu', addMenuItem);
router.get('/:storeId/menu', getMenu);
router.put('/menu/:id', updateMenuItem);
router.delete('/:storeId/menu/:itemId', deleteMenuItem);

router.get('/test', (req, res) => {
    res.send('Test route works!');
  });  

module.exports = router;
