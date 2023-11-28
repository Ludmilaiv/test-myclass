const db = require("../models/dbclient");

class Lesson {
  constructor(date, title, status) {
    this.date = date;
    this.title = title;
    this.status = status;
  }

  async set() {
    const query = `INSERT INTO lessons (date, title, status) 
      VALUES (DATE('${this.date}'), '${this.title}', ${this.status}) RETURNING *`;
    const resust = await db.query(query);
    return resust.rows[0].id;
  }

  static async find(params) {
    const {
      date, 
      title, 
      status, 
      teacherIds, 
      studentsCount, 
      page=1, 
      lessonsPerPage=5
    } = params;

    const dateArray = date ? date.split(",") : null;
    if (dateArray && dateArray.length === 1) {
      dateArray.push(dateArray[0]);
    }

    const studentsCountArray = studentsCount ? studentsCount.split(",") : null;
    if (studentsCountArray && studentsCountArray.length === 1) {
      studentsCountArray.push(studentsCountArray[0]);
    }

    const teachers = teacherIds ? teacherIds.split(",") : null;

    const dateFilter = dateArray ? 
      ` date BETWEEN DATE('${dateArray[0]}') AND 
      DATE_ADD('${dateArray[1]}', INTERVAL '1' DAY)` : 
      "";
    const titleFlter = title ? ` title='${title}'` : "";
    const statusFilter = status ? ` status='${status}'` : "";
    const teachersFilter = teachers ? 
      ` teacher_id IN('${teachers.join("','")}')` : 
      "";
    const studentsCoutFilter = studentsCountArray ? 
      ` COUNT(DISTINCT student_id) 
      BETWEEN '${studentsCountArray[0]}' AND '${studentsCountArray[1]}'`:
      "";
    const whereFilter = [
      dateFilter, 
      titleFlter, 
      statusFilter, 
      teachersFilter
    ].filter((el) => el !== "");
    const query = `SELECT lessons.id, date, title, status, 
    ARRAY(SELECT JSON_OBJECT('id':students.id,'name':name, 'visit':visit) 
      FROM students, lesson_students WHERE students.id=student_id AND lesson_id=lessons.id) AS students,
    ARRAY(SELECT JSON_OBJECT('id':teachers.id,'name':name) 
      FROM teachers, lesson_teachers WHERE teachers.id=teacher_id AND lesson_id=lessons.id) AS teachers
    FROM lessons 
    LEFT OUTER JOIN lesson_teachers ON lessons.id=lesson_teachers.lesson_id
    LEFT OUTER JOIN lesson_students ON lessons.id=lesson_students.lesson_id
    ${whereFilter[0] ? "WHERE" + whereFilter.join(" AND") : ""}
    GROUP BY lessons.id
    ${studentsCoutFilter ? "HAVING" + studentsCoutFilter : ""}
    ORDER BY date 
    LIMIT ${lessonsPerPage} OFFSET ${page * lessonsPerPage - lessonsPerPage}`;
    const result = await db.query(query);
    return result.rows;
  }
}

module.exports = Lesson;