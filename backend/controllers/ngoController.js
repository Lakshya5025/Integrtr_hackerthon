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
