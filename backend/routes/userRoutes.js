// routes/userRoutes.js

const express = require('express');
const { register, verifyEmail, login } = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);
router.get('/verifyemail/:token', verifyEmail);
router.post('/login', login); // Add this new route

module.exports = router;