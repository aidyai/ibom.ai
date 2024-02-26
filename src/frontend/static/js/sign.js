async function signup(event) {
    event.preventDefault();
  
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    const userData = { email, password };
  
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      const data = await response.json();
      alert(data.message); // or display success message in HTML
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.'); // or display error message in HTML
    }
  }
  
  async function signin(event) {
    event.preventDefault();
  
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
  
    const userData = { email, password };
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      const data = await response.json();
      alert('Logged in successfully!'); // or handle login success in your app
    } catch (error) {
      console.error('Error:', error);
      alert('Invalid credentials. Please try again.'); // or handle login failure in your app
    }
  }





// Add event listeners to show/hide forms
document.getElementById("loginBtn").addEventListener("click", function() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("signUpForm").style.display = "none";
  document.getElementById("modalContainer").style.display = "block";
});

document.getElementById("signupBtn").addEventListener("click", function() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signUpForm").style.display = "block";
  document.getElementById("modalContainer").style.display = "block";
});

document.getElementById("showSignupBtn").addEventListener("click", function() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signUpForm").style.display = "block";
});

document.getElementById("showLoginBtn").addEventListener("click", function() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("signUpForm").style.display = "none";
});


// Function to close the modal
function closeModal(event) {
  // Check if the click is outside the modal content or on the modal container
  if (event.target === modalContainer) {
    // Hide the modal container
    modalContainer.style.display = 'none';
  }
}

// Add click event listener to the modal container
modalContainer.addEventListener('click', closeModal);






