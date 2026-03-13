const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    status: {
      type: String,
      enum:  ["pending", "active", "expired", "cancelled"],
      default: "pending",
    },

    pricePaid: {
      type: Number,
      required: true, 
      min: 0,
    },

    startDate: {
      type: Date,
      default: null,
    },

    endDate: {
      type: Date,
      default: null,
    },

    OrderId: {
      type: String,
      default: null,
      sparse: true,
    },

    
    // manualOverride: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);


const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
