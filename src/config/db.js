import mysql from "serverless-mysql";

export const pool = mysql({
  config: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: 3306,
    database: "node_employee_db",
  },
});
