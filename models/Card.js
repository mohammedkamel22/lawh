const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
      index: true, 
    },

   
    backContent: {
      type: String,
      required: true, 
    },

   
    frontQuestions: {
      type: String,
      required: true,
    },

   
    orderIndex: {
      type: Number,
      required: true,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);
modle.exports =Card;