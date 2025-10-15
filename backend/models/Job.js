// models/Job.js

const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a job title'],
    },
    description: {
        type: String,
        required: [true, 'Please add a job description'],
    },
    location: {
        type: String,
        required: [true, 'Please add a location'],
    },
    jobType: {
        type: String,
        required: true,
        enum: ['Volunteer', 'Part-Time', 'Full-Time', 'Internship'],
    },
    skillsRequired: {
        type: [String],
        default: [],
    },
    ngo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Ngo',
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Job', JobSchema);