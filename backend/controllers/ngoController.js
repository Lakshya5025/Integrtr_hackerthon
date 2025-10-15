// controllers/ngoController.js

const Ngo = require('../models/Ngo');
const User = require('../models/User');

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