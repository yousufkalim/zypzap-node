// Init
const { Schema, model } = require('mongoose');

// Admin Schema
const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      default: 'admin',
    },

    status: {
      type: String,
      enum: ['Inactive', 'Active', 'Suspended', 'Deleted'],
      default: 'Inactive',
    },
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = model('admins', adminSchema);
