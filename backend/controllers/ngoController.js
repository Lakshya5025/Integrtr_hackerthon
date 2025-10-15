// controllers/ngoController.js
const axios = require('axios');
const Ngo = require('../models/Ngo');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// @desc    Register an NGO
// @route   POST /api/ngos/register
// @access  Public
exports.registerNgo = async (req, res, next) => {
    const { name, causes, location, email, password } = req.body;

    try {
        let ngo = await Ngo.findOne({ email });
        if (ngo) {
            return res.status(400).json({ success: false, msg: 'NGO already exists' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, msg: 'User with this email already exists' });
        }

        const verificationToken = crypto.randomBytes(20).toString('hex');

        user = new User({
            name,
            email,
            password,
            role: 'admin',
            verificationToken,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();


        ngo = await Ngo.create({
            name,
            causes,
            location,
            email,
            founder: user.id,
            admins: [user.id],
        });

        user.ngo = ngo._id;
        await user.save();


        const verificationUrl = `${req.protocol}://${req.get(
            'host'
        )}/api/users/verifyemail/${verificationToken}`;

        const message = `You are receiving this email because you have registered an NGO on our platform. Please click on the following link, or paste it into your browser to complete the process: \n\n ${verificationUrl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Email Verification',
                message,
            });

            res.status(200).json({
                success: true,
                data: 'Email sent. Please verify your account.',
            });
        } catch (err) {
            console.error(err);
            user.verificationToken = undefined;
            await user.save({ validateBeforeSave: false });
            return res.status(500).json({ success: false, msg: 'Email could not be sent' });
        }
    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) {
            return res.status(400).json({ success: false, msg: 'An NGO with that name or email already exists' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Get all public NGOs from data.gov.in
// @route   GET /api/ngos/public-gov
// @access  Public
exports.getGovernmentNgos = async (req, res, next) => {
    try {
        const apiKey = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
        const apiUrl = `https://api.data.gov.in/resource/9a528656-0599-4652-9e43-7f72b53b5113?api-key=${apiKey}&format=json&limit=1000`;

        const response = await axios.get(apiUrl);

        res.status(200).json({
            success: true,
            data: response.data.records,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, msg: 'Server Error: Could not fetch public NGOs' });
    }
};

exports.getAllPublicNgos = async (req, res, next) => {
    try {
        const { location, causes } = req.query;
        const query = {};

        if (location) {
            query.location = new RegExp(location, 'i');
        }

        if (causes) {
            query.causes = { $in: causes.split(',') };
        }

        const ngos = await Ngo.find(query).populate('founder', 'name');

        res.status(200).json({
            success: true,
            count: ngos.length,
            data: ngos,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.createNgoAdmin = async (req, res, next) => {
    const { name, email, password } = req.body;
    const creatorAdmin = req.user;

    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, msg: 'Email is already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'admin',
            ngo: creatorAdmin.ngo,
            isVerified: true,
        });

        await Ngo.findByIdAndUpdate(
            creatorAdmin.ngo,
            { $push: { admins: newUser._id } },
            { new: true, runValidators: true }
        );

        const message = `Hello ${name},\n\nYou have been added as an admin for your NGO on the Volunteer Portal. Your temporary password is: ${password}\n\nPlease log in and consider changing your password.\n\nThank you!`;

        try {
            await sendEmail({
                email: newUser.email,
                subject: 'You are now an NGO Admin!',
                message,
            });

            res.status(201).json({
                success: true,
                data: { name: newUser.name, email: newUser.email, role: newUser.role },
            });
        } catch (emailErr) {
            console.error(emailErr);
            res.status(201).json({
                success: true,
                data: { name: newUser.name, email: newUser.email, role: newUser.role },
                warning: 'Admin created, but welcome email could not be sent.',
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};