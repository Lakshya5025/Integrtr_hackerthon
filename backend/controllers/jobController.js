// controllers/jobController.js

const Job = require('../models/Job');

// @desc    Get all jobs for the logged-in admin's NGO
// @route   GET /api/jobs
// @access  Private (Admin)
// backend/controllers/jobController.js
exports.getJobsForMyNgo = async (req, res, next) => {
    try {
        // This line is the key: It only finds jobs where the 'ngo' field
        // matches the logged-in admin's NGO ID.
        const jobs = await Job.find({ ngo: req.user.ngo });
        res.status(200).json({ success: true, count: jobs.length, data: jobs });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};

// @desc    Create a new job posting
// @route   POST /api/jobs
// @access  Private (Admin)
exports.createJob = async (req, res, next) => {
    // Associate job with the admin's NGO and the admin's ID
    req.body.ngo = req.user.ngo;
    req.body.postedBy = req.user.id;

    try {
        // Check if user is associated with an NGO
        if (!req.user.ngo) {
            return res.status(400).json({ success: false, msg: 'User is not associated with any NGO' });
        }

        const job = await Job.create(req.body);
        res.status(201).json({ success: true, data: job });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
};

// @desc    Update a job posting
// @route   PUT /api/jobs/:id
// @access  Private (Admin)
exports.updateJob = async (req, res, next) => {
    try {
        let job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, msg: `Job not found with id of ${req.params.id}` });
        }

        // IMPORTANT: Make sure user is the job owner (or belongs to the NGO that owns the job)
        if (job.ngo.toString() !== req.user.ngo.toString()) {
            return res.status(401).json({ success: false, msg: 'User not authorized to update this job' });
        }

        job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, data: job });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
};

// @desc    Delete a job posting
// @route   DELETE /api/jobs/:id
// @access  Private (Admin)
exports.deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, msg: `Job not found with id of ${req.params.id}` });
        }

        // IMPORTANT: Make sure user is the job owner
        if (job.ngo.toString() !== req.user.ngo.toString()) {
            return res.status(401).json({ success: false, msg: 'User not authorized to delete this job' });
        }

        await job.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};

exports.getAllPublicJobs = async (req, res, next) => {
    try {
        const { location, jobType } = req.query;
        const query = {};

        if (location) {
            query.location = new RegExp(location, 'i');
        }

        if (jobType) {
            query.jobType = jobType;
        }

        // Populate NGO name in the job listing
        const jobs = await Job.find(query).populate('ngo', 'name location');

        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get a single public job
// @route   GET /api/jobs/public/:id
// @access  Public
exports.getPublicJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('ngo', 'name email location');

        if (!job) {
            return res.status(404).json({ success: false, msg: `Job not found with id of ${req.params.id}` });
        }
        res.status(200).json({ success: true, data: job });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};