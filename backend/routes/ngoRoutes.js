// routes/ngoRoutes.js

const express = require('express');
const { registerNgo } = require('../controllers/ngoController');
const { protect } = require('../middleware/auth'); // Import the middleware

const router = express.Router();
router.get('/public', getAllPublicNgos);

// Any route defined here is prefixed with /api/ngos

// We apply the 'protect' middleware to this route.
// A user must be logged in to access it.
router.post('/register', protect, registerNgo);

module.exports = router;