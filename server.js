const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.send('Test route works!');
});

// Import routes
const storeRoutes = require('./routes/storeRoutes');
app.use('/api/store', storeRoutes);

app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const menuRoutes = require('./routes/menuRoutes');
app.use('/api/store', menuRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/store', orderRoutes);
