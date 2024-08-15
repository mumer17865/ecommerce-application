const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers')
const verifyToken = require('../middlewares/authMiddleware');

router.get('/itemList', verifyToken, productController.getAllProducts);
router.get('/itemList/:id', verifyToken, productController.getProductById);

module.exports = router;
