const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./complaints.db", (err) => {
  if (err) {
    console.error("DB açılırken hata:", err.message);
  } else {
    console.log("SQLite DB açıldı/oluşturuldu ✅");
  }
});

// complaints tablosu yoksa oluştur
db.run(`CREATE TABLE IF NOT EXISTS complaints (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  location TEXT,
  status TEXT DEFAULT 'Beklemede'
)`);

// users tablosu yoksa oluştur
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
)`);

module.exports = db;


