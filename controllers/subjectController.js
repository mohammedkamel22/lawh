const Subject = require("../models/Subject_Card");
const Card = require("../models/Card");
const Subscription = require("../models/Subscription_StudyPlan");


const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ isPublished: true });
    res.status(200).json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "error while get subject"});
  }
};


const getSubjectCards = async (req, res) => {
  try {
    const { subjectId, studentId } = req.params;
    const studentSubscription = await Subscription.findOne({
      studentId: studentId,
      status: "active" 
    });
    let cardsQuery = Card.find({ subjectId: subjectId, isActive: true })
                         .sort({ orderIndex: 1 });
    if (!studentSubscription) {
      cardsQuery = cardsQuery.limit(5);
    }
    const cards = await cardsQuery;
    res.status(200).json({
      isSubscribed: !!studentSubscription, 
      cardsCount: cards.length,
      cards: cards
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "error while get cards" });
  }
};


const createSubject = async (req, res) => {
  try {
    const { title, description, grade, totalCards, isPublished } = req.body;
    const newSubject = await Subject.create({
      title,
      description,
      grade,
      totalCards: totalCards || 0,
      isPublished: isPublished || true, 
    });
    res.status(201).json({ msg: "الماده اتعملت تمام", subject: newSubject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "error while create " });
  }
};

module.exports = {
  getSubjects,
  getSubjectCards,
  createSubject
};