// controllers/ngoController.js

const Ngo = require('../models/Ngo');
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Make sure bcryptjs is imported
const sendEmail = require('../utils/sendEmail'); // Make sure sendEmail is imported

// @desc    Register an NGO
// @route   POST /api/ngos/register
// @access  Private (requires login)
exports.registerNgo = async (req, res, next) => {
    const { name, causes, location } = req.body;
    const user = req.user; // We get this from the 'protect' middleware

    try {
        // Check if user has already registered an NGO
        if (user.role === 'admin' && user.ngo) {
            return res.status(400).json({ success: false, msg: 'User has already registered an NGO' });
        }

        // Create the NGO
        const ngo = await Ngo.create({
            name,
            causes,
            location,
            email: user.email, // Use the registering user's email for the NGO
            founder: user.id,
            admins: [user.id], // The founder is the first admin
        });

        // Update the user's role to 'admin' and link to the new NGO
        await User.findByIdAndUpdate(user.id, { role: 'admin', ngo: ngo._id });

        res.status(201).json({
            success: true,
            data: ngo,
        });
    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) { // Handles duplicate name or email for NGO
            return res.status(400).json({ success: false, msg: 'An NGO with that name or email already exists' });
        }
        res.status(500).send('Server Error');
    }
};

exports.getAllPublicNgos = async (req, res, next) => {
    try {
        const { location, causes } = req.query;
        const query = {};

        if (location) {
            // Use a case-insensitive regex for partial matching
            query.location = new RegExp(location, 'i');
        }

        if (causes) {
            // The 'causes' query parameter could be a single value or comma-separated
            query.causes = { $in: causes.split(',') };
        }

        const ngos = await Ngo.find(query).populate('founder', 'name'); // Populate founder's name

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
        // 1. Check if the email is already in use
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, msg: 'Email is already registered' });
        }

        // 2. Hash the provided password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create the new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'admin',
            ngo: creatorAdmin.ngo, // Associate with the same NGO
            isVerified: true, // Mark as verified since they are created by a trusted admin
        });

        // 4. Add the new admin's ID to the NGO's admin list
        await Ngo.findByIdAndUpdate(
            creatorAdmin.ngo,
            { $push: { admins: newUser._id } },
            { new: true, runValidators: true }
        );

        // 5. Send a welcome email to the new admin
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
            // Even if email fails, the user is created. We can inform the client.
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