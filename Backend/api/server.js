const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});

module.exports = async(req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    } else if (req.method === "POST" && req.url === "/add-student") {

        const { name, email, course, marks } = req.body;

        db.query(
            "INSERT INTO students (name,email,course,marks) VALUES (?,?,?,?)", [name, email, course, marks],
            (err) => {
                if (err) {
                    res.status(500).send("Error");
                } else {
                    res.send("Student Added");
                }
            }
        );
    } else {
        res.status(404).send("Not Found");
    }
};