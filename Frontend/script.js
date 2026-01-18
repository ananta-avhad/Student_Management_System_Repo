const API_URL = ""; // Empty string means use relative path on Vercel

// Function to fetch and display students
async function fetchStudents() {
    try {
        const response = await fetch(`${API_URL}/students`);
        const students = await response.json();

        const tableBody = document.getElementById("studentTable");
        tableBody.innerHTML = ""; // Clear existing rows

        students.forEach(student => {
            const row = `<tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>${student.marks}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error loading students:", error);
    }
}

// Function to add a student
async function addStudent() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;
    const marks = document.getElementById("marks").value;

    if (!name || !email) {
        alert("Please fill in Name and Email");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/add-student`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, course, marks })
        });

        if (response.ok) {
            alert("Student Added Successfully!");
            fetchStudents(); // Refresh the table
            // Clear inputs
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("course").value = "";
            document.getElementById("marks").value = "";
        } else {
            alert("Failed to add student");
        }
    } catch (error) {
        console.error("Error adding student:", error);
    }
}

// Load students when page loads
window.onload = fetchStudents;