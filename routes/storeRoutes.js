const express = require('express');
const { registerStore, loginStore, getStoreById } = require('../controllers/storeController'); 
const router = express.Router();

router.post('/register', registerStore); // <- This is the route
router.post('/login', loginStore);
router.get('/:storeId', getStoreById);

router.get('/test', (req, res) => {
    res.send('Test route works!');
  });  

module.exports = router;
