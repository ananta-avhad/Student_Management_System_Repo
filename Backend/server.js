if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const path = require("path");
app.use(express.static(path.join(__dirname, "../Frontend")));




// Debug logs
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

// MySQL Pool Connection (CORRECT METHOD)
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// IMPORTANT: NO db.connect() when using createPool()

// ROUTES 

// Add Student
app.post("/add-student", (req, res) => {
    const { name, email, course, marks } = req.body;

    const sql = "INSERT INTO students (name, email, course, marks) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, course, marks], (err) => {
        if (err) {
            console.log("Insert error:", err);
            res.status(500).send("Error inserting data");
        } else {
            res.send("Student Added Successfully");
        }
    });
});

// Get All Students
app.get("/*", (req, res) => {
    const sql = "SELECT * FROM students";

    db.query(sql, (err, result) => {
        if (err) {
            console.log("Fetch error:", err);
            res.json([]);
        } else {
            res.json(result);
        }
    });
});

// SERVER START 

const PORT = process.env.PORT || 3000;

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});


app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});