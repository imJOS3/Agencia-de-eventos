const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);


module.exports = router;
