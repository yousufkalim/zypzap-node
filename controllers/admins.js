// Init
const Admins = require('../models/admins');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT || 10;

exports.register = async (req, res) => {
  try {
    let { email, password, confirmPassword } = req.body; // Getting required fields from body
    const existingAdmin = await Admins.findOne({ email }); // Finding already existing user

    // Extra Validations
    if (existingAdmin) {
      // If we found existing user in db
      return res.status(409).json({ success: false, message: 'Admin already exists.' });
    } else if (password !== confirmPassword) {
      // Passwords not same
      return res.status(400).json({
        success: false,
        message: 'Password and Confirm Password are not same.',
      });
    }

    // Creating User
    req.body.password = bcrypt.hashSync(password, parseInt(bcryptSalt)); // Hashing the password with salt 8
    const admin = await Admins.create(req.body); // Adding user in db
    console.log('adminnew', admin);
    // Done
    res.json({ success: true, admin }); //Success
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    // Getting email and password
    const { email, password } = req.body;

    // Getting user from db
    let admin = await Admins.findOne({ email });

    if (!admin) {
      // If admin not found
      return res.status(404).json({ success: false, message: 'Admin not found' });
    } else if (admin.status === 'Inactive') {
      // If admin not found
      return res.status(400).json({ success: false, message: 'Your account is not activated' });
    } else if (admin.status === 'Suspended') {
      // If admin not found
      return res.status(400).json({ success: false, message: 'Your account has been suspended' });
    }
    // Comparing password
    const isMatched = bcrypt.compareSync(password, admin.password);

    if (!isMatched) {
      // If password not matched
      return res.status(400).json({ success: false, message: 'Invalid Password' });
    }

    // Creating payload with admin object
    const payload = { admin };

    // Generating token
    jwt.sign(payload, tokenSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;

      // done
      res.json({ success: true, admin, token });
    });
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Confirm Admin Auth
exports.confirmAuth = async (req, res) => {
  // If user authenticated
  res.json({ success: true, admin: req.admin, token: req.token });
};

//get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find();
    if (!admins) return res.status(404).send('Admins Not Found');
    res.send(admins);
  } catch (error) {
    res.status(500).send(error);
  }
};
//get one admin
exports.getAdminById = async (req, res) => {
  try {
    const _id = req.params.id;
    const admin = await Admins.findOne({ _id });
    if (!admin) return res.status(404).send('Admin Not Found');
    res.send(admin);
  } catch (error) {
    res.status(500).send(error);
  }
};
//updating profile
exports.getAdminByIdAndUpdate = async (req, res) => {
  try {
    const _id = req.params.id;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    const admin = await Admins.findByIdAndUpdate(_id, req.body, { new: true });
    console.log('req.body', req.body);
    res.json({ success: true, admin });
  } catch (err) {
    console.log('Error ---> ', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err });
  }
};

//delete one admin
exports.deleteAdmin = async (req, res) => {
  try {
    const _id = req.params.id;
    const admin = await Admins.findByIdAndDelete(_id);
    if (!admin) return res.status(404).send('Admin Not Found');
    res.json({ success: true, admin });
  } catch (error) {
    res.status(500).send(error);
  }
};
