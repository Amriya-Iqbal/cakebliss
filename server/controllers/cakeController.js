const Cake = require('../models/Cake');

// Get all cakes
exports.getCakes = async (req, res) => {
  try {
    const cakes = await Cake.find({ isAvailable: true });
    res.json(cakes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single cake
exports.getCakeById = async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) return res.status(404).json({ message: 'Cake not found' });
    res.json(cake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add cake (Admin)
exports.addCake = async (req, res) => {
  try {
    const { name, description, category, price, flavors, sizes, stock } = req.body;
    const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '';

    const cake = await Cake.create({
      name,
      description,
      category,
      price,
      flavors: JSON.parse(flavors),
      sizes: JSON.parse(sizes),
      stock,
      image
    });
    res.status(201).json(cake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update cake (Admin)
exports.updateCake = async (req, res) => {
  try {
    const { name, description, category, price, flavors, sizes, stock } = req.body;
    const updateData = {
      name, description, category, price, stock,
      flavors: JSON.parse(flavors),
      sizes: JSON.parse(sizes),
    };
    if (req.file) {
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }
    const cake = await Cake.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(cake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete cake (Admin)
exports.deleteCake = async (req, res) => {
  try {
    await Cake.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cake deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};