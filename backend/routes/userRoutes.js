const express = require('express');
// Import 'getMe' from the controller
const { register, verifyEmail, login, getMe } = require('../controllers/userController');
// Make sure to import the 'protect' middleware
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.get('/verifyemail/:token', verifyEmail);
router.post('/login', login);

// This route will now work because 'getMe' is imported
router.get('/me', protect, getMe);

module.exports = router;