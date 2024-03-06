// JavaScript
// Initialize Firebase
// Firebase configuration

// Check if user is authenticated on page load
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in
      showProfile(user);
    } else {
      // No user is signed in
      showAuthButtons();
    }
  });
  
  // Function to show registration/login buttons and hide profile
  function showAuthButtons() {
    var profileImage = document.getElementById('profileImage');
    profileImage.style.display = 'none';
  
    var dropdown = document.getElementById('dropdown2');
    dropdown.style.display = 'none';
  
    var authButtons = document.querySelectorAll('.authButton');
    authButtons.forEach(function(button) {
      button.style.display = 'block';
    });
  }
  
  // Function to show user profile and hide registration/login buttons
  function showProfile(user) {
    var profileImage = document.getElementById('profileImage');
    profileImage.src = user.photoURL; // Assuming user.photoURL is the random avatar image
  
    var profileInfo = document.getElementById('profileInfo');
    profileInfo.innerHTML = `
      <p>Name: ${user.displayName}</p>
      <p>Email: ${user.email}</p>
    `;
  
    var dropdown = document.getElementById('dropdown2');
    dropdown.style.display = 'block';
  
    var authButtons = document.querySelectorAll('.authButton');
    authButtons.forEach(function(button) {
      button.style.display = 'none';
    });
  }
  
  // Handle logout
  document.getElementById('logoutButton').addEventListener('click', function() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful
      showAuthButtons();
    }).catch(function(error) {
      // An error happened
      console.error(error.message);
    });
  });
  