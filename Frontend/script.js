if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend correctly
app.use(express.static(path.join(__dirname, "..")));

// Debug logs
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_PORT);

// Database pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});

// Routes
app.post("/add-student", (req, res) => {
    const { name, email, course, marks } = req.body;

    const sql = "INSERT INTO students (name,email,course,marks) VALUES (?,?,?,?)";

    db.query(sql, [name, email, course, marks], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error");
        } else {
            res.send("Student Added");
        }
    });
});

app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) res.json([]);
        else res.json(result);
    });
});

// VERY IMPORTANT - catch all route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});