// server.js
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const router = require("./routes/userRoutes")
// Load env vars

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Simple route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api/users', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));