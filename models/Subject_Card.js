const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    grade: {
      type: String,
      required: true,
      enum: [
          "الأول الإعدادي",
          "الثاني الإعدادي",
          "الثالث الإعدادي",
          "الأول الثانوي",
          "الثاني الثانوي",
          "الثالث الثانوي",
        ]
    },

    totalCards: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
