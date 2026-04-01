const express = require("express");
const router = express.Router();

const { getSubjects, getSubjectCards,createSubject } = require("../controllers/subjectController");

router.get("/", getSubjects);
router.get("/:subjectId/cards/:studentId", getSubjectCards);

router.post("/create", createSubject);

module.exports = router;