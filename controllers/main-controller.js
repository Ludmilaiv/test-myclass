const Lesson = require("../models/lesson-model");
const LessonTeacher = require("../models/lesson-teacher-model");
const createError = require('http-errors')
const { getLessonsValidator, setLessonsValidator } = require("../utiles");

exports.getLessons = async function(req, res, next) {
  const validate = getLessonsValidator(req.query);
  console.log(validate);
  if (!validate.isValid) {
    return next(createError(400, validate.err));
  }

  const lessons = await Lesson.find(req.query);
  
  res.json(lessons);
} 

exports.setLesson = async function(req, res, next) {
  const validate = setLessonsValidator(req.body);
  if (!validate.isValid) {
    return next(createError(400, validate.err));
  }

  const {teacherIds, title, days, firstDate, lessonsCount, lastDate} = req.body;

  const firstDateTyped = new Date(firstDate);
  const lastDateTyped = lastDate ? new Date(lastDate) : null;
  const lessonsLimit = 300;
  const dateLimit = new Date(firstDate);
  dateLimit.setFullYear(dateLimit.getFullYear);

  let count = 0;
  let date = firstDateTyped;
  const lessonsIds = [];

  do {
    if (days.includes(date.getDay())) {
      const lesson = new Lesson(date.toISOString(), title, 0);
      const lessonId = await lesson.set();
      teacherIds.forEach(async teacherId => {
        const lessonTeacher = new LessonTeacher(lessonId, teacherId);
        await lessonTeacher.set();
      });
      lessonsIds.push(lessonId);
      count++;
    }
    date.setDate(date.getDate() + 1);
    if (date > dateLimit || count >= lessonsLimit) break;
  } while (lessonsCount ? count < lessonsCount : date <= lastDateTyped)
  

  res.json(lessonsIds);
}