const Subject = require("../models/Subject_Card");
const StudyPlan = require("../models/StudyPlan");
const CardProgress = require("../models/CardProgress");
const Card = require("../models/Card");


const getStudentPlan = async (req, res) => {
  try {
    const { studentId } = req.params;
    const plan = await StudyPlan.findOne({ studentId: studentId });
    
    if (!plan) {
      return res.status(404).json({ msg: "Study plan not found" });
    }
    
    res.status(200).json(plan);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while getting student plan" });
  }
};


const createStudyPlan = async (req, res) => {
  try {
    const { studentId, subjectId, daysToFinish } = req.body;

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ msg: "Subject not found, study plan not created" });
    }

    const totalCards = subject.totalCards;
    const dailyQuota = Math.ceil(totalCards / daysToFinish);
    
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysToFinish);

    const newPlan = await StudyPlan.create({
      studentId: studentId,
      subjectId: subjectId,
      targetDate: targetDate,
      dailyQuota: dailyQuota,
      completedCards: 0 
    });

    res.status(201).json({
      msg: "Plan created",
      plan: newPlan
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while creating plan" });
  }
};



const getTodayCards = async (req, res) => {
  try {
    const { studentId, subjectId } = req.params;

    const plan = await StudyPlan.findOne({ studentId: studentId, subjectId: subjectId });
    if (!plan) {
      return res.status(404).json({ msg: "Study plan not found" });
    }

    
    const studentProgress = await CardProgress.find({ studentId: studentId, subjectId: subjectId });

    const seenCardIds = []; 
    const learningCardIds = [];
    const reviewCardIds = []; 

    const today = new Date();
    for (let i = 0; i < studentProgress.length; i++) {
      let progress = studentProgress[i];
      
      seenCardIds.push(progress.cardId);

      if (progress.status === "assessment") {
        learningCardIds.push(progress.cardId);
      }

      if (progress.status === "review" && new Date(progress.nextReviewDate) <= today) {
        reviewCardIds.push(progress.cardId);
      }
    }

    
    const newCards = await Card.find({ 
      subjectId: subjectId, 
      isActive: true, 
      _id: { $nin: seenCardIds } 
    }).limit(plan.dailyQuota);

    const evaluationCards = await Card.find({ _id: { $in: learningCardIds } });

    const reviewCards = await Card.find({ _id: { $in: reviewCardIds } });

    res.status(200).json({
      newCards: newCards,
      evaluationCards: evaluationCards,
      reviewCards: reviewCards
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while getting today cards" });
  }
};

const submitProgress = async (req, res) => {
  try {
    const { studentId, cardId, difficulty } = req.body; 
    
    let progress = await CardProgress.findOne({ studentId: studentId, cardId: cardId });

    if (!progress) {
      progress = new CardProgress({
        studentId: studentId,
        cardId: cardId,
        status: "new",
        interval: 0,
      });
    }

    
    progress.lastDifficulty = difficulty;
    let daysToAdd = 0;

    if (difficulty === "forgotten" || difficulty === "hard") {
      daysToAdd = 1; 
    } else if (difficulty === "medium") {
      daysToAdd = 3; 
    } else if (difficulty === "easy") {
      daysToAdd = 7; 
    }

    
    progress.interval = daysToAdd;
    progress.status = "review";
    progress.totalReviews += 1; 

  
    if (progress.totalReviews >= 5 && difficulty === "easy") {
      progress.status = "mastered";
    }

    
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + daysToAdd);
    progress.nextReviewDate = nextDate;

    
    await progress.save();

    res.status(200).json({
      msg: "Progress updated",
      nextReviewDate: progress.nextReviewDate,
      status: progress.status
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while updating progress plan" });
  }
};

module.exports = { 
  getStudentPlan, 
  createStudyPlan, 
  getTodayCards, 
  submitProgress 
};