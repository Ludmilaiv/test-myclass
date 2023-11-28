const Lesson = require("../models/lesson-model");

exports.getLessons = async function(req, res) {
  const lessons = await Lesson.find(req.query);
  res.send(JSON.stringify(lessons));
} 