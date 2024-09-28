const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin Login Controller
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
//   console.log(username, " ", password)
  try {
    const admin = await Admin.findOne({ username });
    // console.log("Admin data is this-> ", admin)

    if (!admin) {
      return res.status(401).json({ msg: 'Invalid User Name credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid Password' });
    }

    // Create JWT token
    const payload = { username: admin.username, id: admin._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    // console.log(payload)
    // console.log(token)
    // Return token
    res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
