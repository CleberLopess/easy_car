import sqlite3 from "sqlite3";

const SQLite = sqlite3.verbose();
const dbPath = "./src/database/banco.db";

export const execute = (command, params, method = "all") => {
  return new Promise((resolve, reject) => {
    db[method](command, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export const db = new SQLite.Database(dbPath, SQLite.OPEN_READWRITE, (err) => {
  if (err) console.log("Database error: " + err.message);
  else console.log("Database connected");
});
