const router = require('express').Router();
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/customers', protect, adminOnly, async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' }).select('-password');
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;