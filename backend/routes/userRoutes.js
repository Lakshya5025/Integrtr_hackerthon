// routes/userRoutes.js

const express = require('express');
const { register, verifyEmail, login } = require('../controllers/userController');
const { protect } = require('../middleware/auth'); // Make sure to import protect

const router = express.Router();

router.post('/register', register);
router.get('/verifyemail/:token', verifyEmail);
router.post('/login', login); // Add this new route
router.get('/me', protect, getMe); // Add this line before module.exports

module.exports = router;