const jwt = require('jsonwebtoken');
require('dotenv').config();
// Middleware to authenticate JWT token
exports.authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // Add admin data to request object
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
