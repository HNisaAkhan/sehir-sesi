const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt"); // npm install bcrypt

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// --------------------
// Kayıt Ol
app.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({ error: "Tüm alanlar doldurulmalı" });
    }

    const name = `${firstName} ${lastName}`;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword],
            function(err){
                if(err){
                    return res.status(400).json({ error: "E-posta zaten kayıtlı" });
                }
                res.json({ id: this.lastID, message: "Kayıt başarılı" });
            }
        );
    } catch(err) {
        res.status(500).json({ error: "Kayıt sırasında hata oluştu" });
    }
});

// --------------------
// Giriş Yap
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({ error: "Tüm alanlar doldurulmalı" });
    }

    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, row) => {
        if(err) return res.status(500).json({ error: "Hata oluştu" });
        if(!row) return res.status(400).json({ error: "E-posta bulunamadı" });

        const match = await bcrypt.compare(password, row.password);
        if(match){
            res.json({ message: "Giriş başarılı", user: { id: row.id, name: row.name, email: row.email } });
        } else {
            res.status(400).json({ error: "Şifre yanlış" });
        }
    });
});

// --------------------
// Root endpoint
app.get("/", (req, res) => {
  res.send("Şehir Sesi API çalışıyor 🎶");
});

// --------------------
// Complaints - CRUD

// CREATE
app.post("/complaints", (req, res) => {
  const { title, description, location } = req.body;

  db.run(
    "INSERT INTO complaints (title, description, location) VALUES (?, ?, ?)",
    [title, description, location],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID });
      }
    }
  );
});

// READ
app.get("/complaints", (req, res) => {
  db.all("SELECT * FROM complaints", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// UPDATE
app.put("/complaints/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, location, status } = req.body;

  db.run(
    `UPDATE complaints
     SET title = COALESCE(?, title),
         description = COALESCE(?, description),
         location = COALESCE(?, location),
         status = COALESCE(?, status)
     WHERE id = ?`,
    [title, description, location, status, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ updatedRows: this.changes });
      }
    }
  );
});

// DELETE
app.delete("/complaints/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM complaints WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ deletedRows: this.changes });
      }
    }
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor 🚦`);
});



