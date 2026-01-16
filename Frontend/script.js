//For displaying records

function loadStudents() {
    fetch("https://student-management-system-ananta-avhad.onrender.com/students")
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("studentTable");
            table.innerHTML = "";

            data.forEach(student => {
                const row = table.insertRow();
                row.insertCell(0).innerText = student.name;
                row.insertCell(1).innerText = student.email;
                row.insertCell(2).innerText = student.course;
                row.insertCell(3).innerText = student.marks;
            });
        });
}



function addStudent() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;
    const marks = document.getElementById("marks").value;

    fetch("https://student-management-system-ananta-avhad.onrender.com/add-student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                course: course,
                marks: marks
            })
        })
        .then(response => response.text())
        .then(data => {
            alert("Student Added Successfully");
            loadStudents(); // refresh table
        })

    .catch(error => {
        console.log("Error:", error);
    });
}

window.onload = loadStudents; //after reloading window