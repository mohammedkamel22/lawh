const mongoose = require("mongoose");

const cardProgressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true, 
    },

    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
      required: true,
    },

    status: {
      type: String,
      enum: ["new", "studied", "assessment", "review", "mastered"],
      default: "new",
    },

    lastDifficulty: {
      type: String,
      enum:  ["hard", "medium", "easy", "forgotten"],
        default: null,
      },

   
    studiedAt: {
      type: Date,
      default: null,
    },

    
    assessmentDueAt: {
      type: Date,
      default: null,
    },

    nextReviewDate: {
      type: Date,
      default: null,
    },

    
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);


const CardProgress = mongoose.model("CardProgress", cardProgressSchema);
module.exports = CardProgress;
