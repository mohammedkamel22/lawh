const express = require("express");
const router = express.Router(); 

const {getStudentPlan,createStudyPlan,getTodayCards,submitProgress} = require("../controllers/studyPlanController");


router.get("/:studentId", getStudentPlan);
router.post("/create", createStudyPlan);
router.get("/today-cards/:studentId/:subjectId", getTodayCards);
router.post("/submit-progress", submitProgress);


module.exports = router;
