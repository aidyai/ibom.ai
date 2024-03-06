// Function to randomly select an avatar URL from the database
function getRandomAvatarUrl() {
    // Assuming you have avatars stored in a "avatars" node in your database
    return firebase.database().ref('avatars').once('value').then(function(snapshot) {
      const avatars = snapshot.val();
      const avatarKeys = Object.keys(avatars);
      const randomKey = avatarKeys[Math.floor(Math.random() * avatarKeys.length)];
      return avatars[randomKey];
    });
  }
  
  // Function to create a new user with a randomly selected avatar
  function createUserWithEmailAndPasswordAndAvatar(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(userCredential) {
        // Get a random avatar URL
        return getRandomAvatarUrl().then(function(avatarUrl) {
          // Update user's profile with the random avatar URL
          return userCredential.user.updateProfile({
            photoURL: avatarUrl
          });
        });
      });
  }
  
  // Usage example
  createUserWithEmailAndPasswordAndAvatar('example@example.com', 'password')
    .then(function() {
      console.log('User created with a randomly selected avatar.');
    })
    .catch(function(error) {
      console.error('Error creating user:', error);
    });
  