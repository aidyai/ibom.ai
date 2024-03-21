// Function to handle successful signup
function handleSignupSuccess(email) {
    // Hide the old navbar and show the new navbar
    document.getElementById('oldNavbar').style.display = 'none';
    document.getElementById('newNavbar').style.display = 'block';

    // Update user email in the profile dropdown
    document.getElementById('userEmail').innerText = email;
    
    // Reload the page
    window.location.reload();
}





// Function to handle user authentication state
function checkAuthState() {
    // Assume you have a function `getUserInfo` that fetches user info from your FastAPI backend
    fetch('/signup', {
        method: 'POST',
        body: new FormData(document.getElementById('signupForm'))
    })
        .then(response => response.json())
        .then(data => {
        if (data.email) {
            // User is logged in
            handleSignupSuccess(data.email);
        }
        })
        .catch(error => {
        console.error('Error fetching user info:', error);
        });
}

// Call checkAuthState when the page loads
window.addEventListener('load', checkAuthState);