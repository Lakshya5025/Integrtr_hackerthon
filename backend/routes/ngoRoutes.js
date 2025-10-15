// routes/ngoRoutes.js

const express = require('express');
const {
    registerNgo,
    getAllPublicNgos,
    createNgoAdmin,
} = require('../controllers/ngoController');
const { protect, authorize } = require('../middleware/auth'); // Import authorize

const router = express.Router();
router.get('/public', getAllPublicNgos);


// Protected routes (require login)
router.use(protect);

router.post('/register', registerNgo); // For a user to register their own NGO

// Protected admin route (requires 'admin' role)
router.post('/admins', authorize('admin'), createNgoAdmin);

module.exports = router;