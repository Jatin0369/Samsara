const express = require('express');
const app = express();
const cors = require('cors');
const blogdetailRoutes = require('./routes/blogDetailRoute');
const newtourRoute = require('./routes/newtourRoute')
const adminRoutes = require('./routes/adminRoute')
const connectDB = require('./config/dbConfig');
const path = require('path');
require('dotenv').config

// Connect to MongoDB
connectDB();

// Enable CORS for all routes and origins
app.use(cors());

// Middleware to handle JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/blog', blogdetailRoutes);
app.use('/api', newtourRoute);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
