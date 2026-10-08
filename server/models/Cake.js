const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  category:    { type: String }, // Birthday, Wedding, Anniversary
  price:       { type: Number, required: true },
  flavors:     [String],         // ['Chocolate', 'Vanilla']
  sizes:       [String],         // ['500g', '1kg', '2kg']
  image:       { type: String }, // image URL
  stock:       { type: Number, default: 10 },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Cake', cakeSchema);