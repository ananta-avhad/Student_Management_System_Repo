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

    console.log("DEBUG HOST: ", `"${process.env.DB_HOST}"`);
    console.log("DEBUG USER: ", `"${process.env.DB_USER}"`);
    console.log("DEBUG PORT: ", `"${process.env.DB_PORT}"`);
    // 1. Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. Handle GET Request (View Students)
    // We check if the URL *includes* /students because of how Vercel routes
    if (req.method === "GET" && req.url.includes("/students")) {
        db.query("SELECT * FROM students", (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Database error" });
            } else {
                res.status(200).json(result);
            }
        });
    }
    // 3. Handle POST Request (Add Student)
    else if (req.method === "POST" && req.url.includes("/add-student")) {
        const { name, email, course, marks } = req.body;

        // Basic validation
        if (!name || !email) {
            return res.status(400).send("Name and Email are required");
        }

        const sql = "INSERT INTO students (name, email, course, marks) VALUES (?,?,?,?)";
        db.query(sql, [name, email, course, marks], (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error adding student");
            } else {
                res.status(200).send("Student Added");
            }
        });
    }
    // 4. Handle 404
    else {
        res.status(404).send("Not Found");
    }
};