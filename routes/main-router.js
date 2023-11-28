const express = require('express');
const router = express.Router();
const mainController = require("../controllers/main-controller");

router.get("/", mainController.getLessons);

router.post("/lessons", mainController.setLesson)


module.exports = router;
