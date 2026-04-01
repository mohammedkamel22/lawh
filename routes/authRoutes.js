const express = require("express");
const router = express.Router(); 

const { registerStudent, registerParent, login, logout } = require("../controllers/authController");


router.post("/register/student", registerStudent);
router.post("/register/parent", registerParent);

router.post("/login", login);
router.get("/logout", logout);

module.exports = router;