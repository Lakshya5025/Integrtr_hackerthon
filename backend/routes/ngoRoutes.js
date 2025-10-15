// routes/ngoRoutes.js

const express = require('express');
const {
    registerNgo,
    getAllPublicNgos,
    getGovernmentNgos, // Import the new controller
    createNgoAdmin,
} = require('../controllers/ngoController');
const { protect, authorize } = require('../middleware/auth'); // Import authorize

const router = express.Router();
router.post('/register', registerNgo);
router.get('/public', getAllPublicNgos);
router.get('/public-gov', getGovernmentNgos); // Add the new route


// Protected routes (require login)
router.use(protect);

// Protected admin route (requires 'admin' role)
router.post('/admins', authorize('admin'), createNgoAdmin);

module.exports = router;