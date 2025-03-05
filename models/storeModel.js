const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNo: { type: String },
  upiId: { type: String, required: true },
  menu: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ],
  qrCodeUrl: { type: String }
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
