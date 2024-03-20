function submitSignupForm(event) {
    event.preventDefault(); // Prevent form submission

    // Get form inputs
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Check if any field is empty
    if (!fullName || !email || !password) {
        alert('Please fill in all fields.');
        return false; // Prevent form submission
    }

    // Additional validation logic if needed
    
    // If all checks pass, submit the form
    document.getElementById('signupForm').submit();
    return true;
}


submitSignupForm();