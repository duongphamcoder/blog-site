import mysql from "mysql";

const con = mysql.createConnection({
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
});

class DB {
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

const db = new DB();
export { db };
