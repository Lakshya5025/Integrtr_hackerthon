
const crypto = require('crypto');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, msg: 'User already exists' });
        }

        // Create user object (without saving yet)
        user = new User({
            name,
            email,
            password,
        });

        // Create verification token
        const verificationToken = crypto.randomBytes(20).toString('hex');
        user.verificationToken = verificationToken;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Create verification URL
        // NOTE: In a real app, this URL should point to your FRONTEND application
        const verificationUrl = `${req.protocol}://${req.get(
            'host'
        )}/api/users/verifyemail/${verificationToken}`;

        const message = `You are receiving this email because you have registered on our platform. Please click on the following link, or paste it into your browser to complete the process: \n\n ${verificationUrl}`;

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
            user.verificationToken = undefined; // Reset token
            await user.save({ validateBeforeSave: false });
            return res.status(500).json({ success: false, msg: 'Email could not be sent' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Verify email
// @route   GET /api/users/verifyemail/:token
// @access  Public
exports.verifyEmail = async (req, res, next) => {
    try {
        const token = req.params.token;

        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ success: false, msg: 'Invalid token' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ success: true, data: 'Email verified successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
        return res.status(400).json({ success: false, msg: 'Please provide an email and password' });
    }

    try {
        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, msg: 'Invalid credentials' });
        }

        // Check if email is verified
        if (!user.isVerified) {
            return res.status(401).json({ success: false, msg: 'Please verify your email to log in' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, msg: 'Invalid credentials' });
        }

        // Create token and send response
        const token = user.getSignedJwtToken();
        res.status(200).json({ success: true, token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};