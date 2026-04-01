const express = require("express");
const router = express.Router();
const { activateSubscription } = require("../controllers/subscriptionController");

router.post("/activate", activateSubscription);

module.exports = router;