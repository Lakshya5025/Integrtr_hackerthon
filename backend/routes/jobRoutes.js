// backend/routes/jobRoutes.js

const express = require('express');
const {
    getAllPublicJobs,
    getPublicJobById,
    getJobsForMyNgo,
    createJob,
    updateJob,
    deleteJob,
} = require('../controllers/jobController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public Routes - anyone can view jobs
router.get('/public', getAllPublicJobs);
router.get('/public/:id', getPublicJobById); // Moved this line up

// --- Protected Admin Routes Below ---
router.use(protect);
router.use(authorize('admin')); // Now this only applies to the routes below

router.route('/')
    .get(getJobsForMyNgo)
    .post(createJob);

router.route('/:id')
    .put(updateJob)
    .delete(deleteJob);

module.exports = router;