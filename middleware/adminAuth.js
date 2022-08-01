/**
 * Check auth middleware
 * @author Yousuf Kalim
 */
const jwt = require('jsonwebtoken');
const Admins = require('../models/admins');
const tokenSecret = process.env.TOKEN_SECRET;

// Check auth
exports.checkAdminAuth = async (req, res, next) => {
  // Get token from Header
  const header = req.get('Authorization');

  // Check if not token
  if (!header || !header.startsWith('Bearer')) {
    return res.status(403).json({
      success: false,
      message: 'No token found, Authorization denied',
    });
  }

  try {
    // Decrypting token
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, tokenSecret);
    const admin = await Admins.findById(decoded.admin._id);

    if (!admin) {
      res.status(404).json({ success: false, message: 'Admin not found' });
    }
    req.admin = admin;
    req.token = token;

    // If user authenticated
    res.set(
      'cache-control',
      'no-cache, no-store, private, must-revalidate, post-check=0, pre-check=0'
    );

    // Done
    next();
  } catch (err) {
    // If not
    res.status(403).json({ success: false, message: 'Your session has been expired' });
  }
};
