const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength:3, 
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

   
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
