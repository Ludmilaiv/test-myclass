const db = require("../models/dbclient");

class LessonStudent {
  constructor(lesson_id, student_id, visit=false) {
    this.lesson_id = lesson_id;
    this.student_id = student_id;
    this.visit = visit;
  }

  async set() {
    const query = `INSERT INTO lesson_students (lesson_id, student_id, visit) VALUES (${this.lesson_id}, ${this.student_id})`
    const resust = await db.query(query);
    return resust;
  }
}


module.exports = LessonStudent;