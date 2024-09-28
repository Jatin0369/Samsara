const express = require('express');
const router = express.Router();
const login = require('../contollers/adminController');
const { authenticateJWT } = require('../middlewares/authAdmin');

// Admin login route
router.post('/login', login.loginAdmin);

// Protected route example - Admin operations
router.get('/dashboard', authenticateJWT, (req, res) => {
  res.json({ msg: 'Welcome to the Admin Dashboard' });
});

module.exports = router;
