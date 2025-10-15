// routes/applicationRoutes.js

const express = require('express');
const { applyForJob, getJobApplications } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes here are protected and require a user to be logged in.
router.use(protect);

// A user (volunteer) can apply for a job.
router.post('/:jobId', applyForJob);

// An admin can view all applications for a job.
router.get('/:jobId', authorize('admin'), getJobApplications);

module.exports = router;