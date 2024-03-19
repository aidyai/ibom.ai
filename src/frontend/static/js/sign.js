// Function to serialize form data into JSON format
function serializeFormToJson(form) {
    const formData = new FormData(form);
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });
    return JSON.stringify(jsonObject);
}

// Function to handle form submission for signup
async function handleSignupFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formDataJson = serializeFormToJson(form);

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            body: formDataJson,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Show success message
        } else {
            const errorData = await response.json();
            alert(errorData.message); // Show error message
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.'); // Show generic error message
    }
}

// Add event listener to the signup form
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', handleSignupFormSubmission);

// Login Form Submission
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Create JSON object with form data
    const formData = {
        email: email,
        password: password
    };

    // Send form data to backend endpoint
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            alert("Login successful!"); // Show success message
        } else {
            const errorData = await response.json();
            alert(errorData.detail); // Show error message
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again."); // Show generic error message
    }
});

