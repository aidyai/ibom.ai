// Get the popup elements
const registerPopup = document.getElementById('registerPopup');
const loginPopup = document.getElementById('loginPopup');
const overlay = document.getElementById('overlay');

// Get the button elements
const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById('loginButton');

// Function to show the register popup
function showRegisterPopup() {
    registerPopup.style.display = 'block';
    overlay.style.display = 'block';
}

// Function to show the login popup
function showLoginPopup() {
    loginPopup.style.display = 'block';
    overlay.style.display = 'block';
}

// Event listeners for buttons
registerButton.addEventListener('click', showRegisterPopup);
loginButton.addEventListener('click', showLoginPopup);

// Close popup when overlay is clicked
overlay.addEventListener('click', function() {
    registerPopup.style.display = 'none';
    loginPopup.style.display = 'none';
    overlay.style.display = 'none';
});


// Toggle visibility of signup and login popups
function toggleSignupPopup() {
    document.getElementById("registerPopup").style.display = "block";
    document.getElementById("loginPopup").style.display = "none";
}

function toggleLoginPopup() {
    document.getElementById("registerPopup").style.display = "none";
    document.getElementById("loginPopup").style.display = "block";
}

// Toggle password visibility for signup form
function toggleSignupPasswordVisibility() {
    const passwordInput = document.getElementById("signupPassword");
    const passwordIcon = document.querySelector("#signupPassword + .show-password i");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordIcon.classList.remove("fa-eye");
        passwordIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        passwordIcon.classList.remove("fa-eye-slash");
        passwordIcon.classList.add("fa-eye");
    }
}

// Toggle password visibility for login form
function toggleLoginPasswordVisibility() {
    const passwordInput = document.getElementById("loginPassword");
    const passwordIcon = document.querySelector("#loginPassword + .show-password i");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordIcon.classList.remove("fa-eye");
        passwordIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        passwordIcon.classList.remove("fa-eye-slash");
        passwordIcon.classList.add("fa-eye");
    }
}