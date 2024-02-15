// Get all the buttons
const buttons = document.querySelectorAll('.kngrRb');

// Get the input field
const inputField = document.getElementById('user-input');

// Loop through each button and add click event listener
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the text content of the clicked button
        const buttonText = button.textContent.trim();
        
        // Append the text content of the button to the input field
        inputField.value += buttonText;
    });
});
