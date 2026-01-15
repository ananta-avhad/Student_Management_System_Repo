const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "7448",
    database: "student_db"
});

db.connect(err => {
    if (err) console.log("DB Error:", err);
    else console.log("MySQL Connected");
});

app.post("/add-student", (req, res) => {
    console.log("Received:", req.body);

    const { name, email, course, marks } = req.body;
    const sql = "INSERT INTO students (name,email,course,marks) VALUES (?,?,?,?)";

    db.query(sql, [name, email, course, marks], err => {
        if (err) {
            console.log("Insert error:", err);
            res.send("Error");
        } else {
            res.send("Student Added");
        }
    });
});

//Here disply rescords is added

app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.json([]);
        } else {
            res.json(result);
        }
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});