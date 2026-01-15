function addStudent() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;
    const marks = document.getElementById("marks").value;

    fetch("http://localhost:3000/add-student", {
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
            console.log("Server says:", data);
            alert("Student Added Successfully");
        })
        .catch(error => {
            console.log("Error:", error);
        });
}