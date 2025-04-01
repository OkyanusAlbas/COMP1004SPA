// Function to render the login page
export function renderLoginPage() {
  // Set the inner HTML of the element with id 'app-content' to display the login form
  document.getElementById('app-content').innerHTML = `
    <h2>Login</h2>
    <form id="login-form">
      <input type="text" id="login-username-email" placeholder="Username or Email" required />
      <input type="password" id="login-password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="#register">Register here</a></p>
  `;

  // Add an event listener for the form submission to trigger the login handling
  document.getElementById('login-form').addEventListener('submit', handleLogin);
}

// Function to handle the login logic when the form is submitted
function handleLogin(event) {
  event.preventDefault(); // Prevent the default form submission (which would reload the page)
  
  // Get the values entered by the user for username/email and password
  const usernameEmail = document.getElementById('login-username-email').value;
  const password = document.getElementById('login-password').value;

  // Make a request to the server to search for a user by email or username
  fetch('http://localhost:5000/users?email=' + usernameEmail + '&username=' + usernameEmail)
    .then(res => res.json()) // Parse the response as JSON
    .then(users => {
      // Find a user where the email or username matches the input
      const user = users.find(user => user.email === usernameEmail || user.username === usernameEmail);
      
      // Check if the user exists and the password matches
      if (user && user.password === password) {
        // If the user is valid and the password matches, store the username in localStorage
        localStorage.setItem("username", user.username);
        
        // Redirect to the home page by changing the URL hash without reloading the page
        window.location.hash = '#'; // Change the hash to home ('#'), which will trigger the home page to be rendered
      } else {
        // If login fails, alert the user that the username/email or password is incorrect
        alert('Incorrect username/email or password');
      }
    });
}
