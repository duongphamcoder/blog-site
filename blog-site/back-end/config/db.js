const mysql = require("mysql");

const con = mysql.createConnection({
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
});

class db {
  constructor() {}

  connect() {
    con.connect((err) => {
      if (err) {
        console.error("Error connecting database:" + err.stack);
        return;
      }
      console.log("Connected as id" + con.threadId);
    });
  }
}

module.exports = new db();
