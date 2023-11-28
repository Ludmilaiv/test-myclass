const db = require("../models/dbclient");

class Teacher {
  constructor(name) {
    this.name = name;
  }

  async set() {
    const query = `INSERT INTO teachers (name) VALUES ('${this.name}')`
    const resust = await db.query(query);
    return resust;
  }
}


module.exports = Teacher;