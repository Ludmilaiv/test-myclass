const db = require("../models/dbclient");

class LessonTeacher {
  constructor(lesson_id, teacher_id) {
    this.lesson_id = lesson_id;
    this.teacher_id = teacher_id;
  }

  async set() {
    const query = `INSERT INTO lesson_teachers (lesson_id, teacher_id) VALUES (${this.lesson_id}, ${this.teacher_id})`
    const resust = await db.query(query);
    return resust;
  }
}


module.exports = LessonTeacher;