const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
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
      minlength: 3,
    },

    grade: {
      type: String,
      required: true,
      enum: [ "الأول الإعدادي",
              "الثاني الإعدادي",
              "الثالث الإعدادي",
              "الأول الثانوي",
              "الثاني الثانوي",
              "الثالث الثانوي"],
     default:"الثالث الإعدادي"
    },


    department: {
      type: String,
      enum:  ["القسم العلمي", "القسم الأدبي","عام"],
      default:"عام"
      },
       
    

    linkedParentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
    },

    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
