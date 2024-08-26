const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyControllers')
const verifyToken = require('../middlewares/authMiddleware');

router.get('/history/:id', historyController.getHistory);
module.exports = router;