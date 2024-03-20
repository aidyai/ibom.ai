

function toggleDropdown() {
var dropdown = document.getElementById("profileDropdown");
dropdown.classList.toggle("active");
}



// Function to handle the signup success message
function handleSignupSuccess(response) {
    if (response.message === "User created successfully") {
        // Reload the page
        window.location.reload();
    }
}
