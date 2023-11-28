const db = require("../models/dbclient");

class Student {
  constructor(name) {
    this.name = name;
  }

  async set() {
    const query = `INSERT INTO students (name) VALUES ('${this.name}')`
    const resust = await db.query(query);
    return resust;
  }
}


module.exports = Student;