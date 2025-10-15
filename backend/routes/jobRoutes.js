
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

// Public Route - anyone can view jobs
router.get('/public', getAllPublicJobs);

// --- Protected Admin Routes Below ---
router.use(protect);
router.use(authorize('admin'));

router.route('/')
    .get(getJobsForMyNgo)
    .post(createJob);

router.route('/:id')
    .put(updateJob)
    .delete(deleteJob);
router.get('/public/:id', getPublicJobById); // Add this new route

module.exports = router;