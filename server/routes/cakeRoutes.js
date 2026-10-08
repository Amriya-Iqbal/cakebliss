const router = require('express').Router();
const {
  getCakes, getCakeById, addCake, updateCake, deleteCake
} = require('../controllers/cakeController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/', getCakes);
router.get('/:id', getCakeById);
router.post('/', protect, adminOnly, upload.single('image'), addCake);
router.put('/:id', protect, adminOnly, upload.single('image'), updateCake);
router.delete('/:id', protect, adminOnly, deleteCake);

module.exports = router;