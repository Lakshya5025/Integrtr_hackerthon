// models/Ngo.js

const mongoose = require('mongoose');

const NgoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
    },
    causes: {
        type: [String],
        required: [true, 'Please add at least one cause'],

    },
    location: {
        // For now, we'll keep it simple. We can enhance this later with GeoJSON.
        type: String,
        required: [true, 'Please add a location'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    founder: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    admins: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Ngo', NgoSchema);