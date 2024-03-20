// Function to hide old navbar and show new navbar upon successful signup
function handleSuccessfulSignup() {
    let oldNavbar = document.querySelector("#nav-menu");
    let newNavbar = document.querySelector("#new-navbar"); // ID of the new navbar

    if (oldNavbar && newNavbar) {
        oldNavbar.style.display = "none"; // Hide old navbar
        newNavbar.style.display = "block"; // Show new navbar
    }
}

// Function to listen for successful signup event or response
async function listenForSignup() {
    try {
        const response = await fetch('/signup', {
            method: 'POST',
            // Add necessary headers or body if required
        });

        if (response.ok) {
            // Signup successful
            handleSuccessfulSignup();
        } else {
            // Handle unsuccessful signup
            console.error('Signup failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call listenForSignup function to start listening for successful signup
listenForSignup();
