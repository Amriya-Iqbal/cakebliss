const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cake: { type: mongoose.Schema.Types.ObjectId, ref: 'Cake', required: true },
  customization: {
    flavor:  { type: String },
    size:    { type: String },
    message: { type: String }
  },
  quantity:        { type: Number, default: 1 },
  totalPrice:      { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  deliveryDate:    { type: Date },
  status: {
    type: String,
    enum: ['Placed','Confirmed','Baking','Ready','Out for Delivery','Delivered','Cancelled'],
    default: 'Placed'
  },
  paymentStatus: { type: String, enum: ['Pending','Paid'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);