const mongoose =require("mongoose");

const studyPlanSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true, 
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    
    targetDate: {
      type: Date,
      required: true,
    },

    
    dailyQuota: {
      type: Number,
      required: true,
      min: 1,
    },

   
    completedCards: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// studyPlanSchema.index({ studentId: 1, subjectId: 1 }, { unique: true });

const StudyPlan = mongoose.model("StudyPlan", studyPlanSchema);
module.exports=StudyPlan;
