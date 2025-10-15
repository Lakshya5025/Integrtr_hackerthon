
const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for a job
// @route   POST /api/applications/:jobId
// @access  Private (Volunteer/User)
exports.applyForJob = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const applicantId = req.user.id;

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, msg: 'Job not found' });
        }

        // The unique index in the model will handle duplicate applications
        // and throw an error, which we'll catch.
        const application = await Application.create({
            job: jobId,
            applicant: applicantId,
        });

        res.status(201).json({ success: true, data: application });
    } catch (err) {
        // Catch the duplicate key error
        if (err.code === 11000) {
            return res.status(400).json({ success: false, msg: 'You have already applied for this job' });
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @desc    Get all applications for a specific job
// @route   GET /api/applications/:jobId
// @access  Private (Admin)
exports.getJobApplications = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;

        // First, verify the job exists and belongs to the admin's NGO
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, msg: 'Job not found' });
        }

        if (job.ngo.toString() !== req.user.ngo.toString()) {
            return res.status(401).json({ success: false, msg: 'User not authorized to view these applications' });
        }

        // Find all applications for this job and populate applicant details
        const applications = await Application.find({ job: jobId }).populate('applicant', 'name email');

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};