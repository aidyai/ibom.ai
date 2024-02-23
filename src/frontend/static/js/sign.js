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
  