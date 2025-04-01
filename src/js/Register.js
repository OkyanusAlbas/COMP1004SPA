// Importing the zxcvbn library to check the strength of passwords
import zxcvbn from 'zxcvbn';

// Function to render the register page
export function renderRegisterPage() {
  // Set the inner HTML content of the 'app-content' div to display the registration form
  document.getElementById('app-content').innerHTML = `
    <h2>Register</h2>
    <form id="register-form">
      <input type="text" id="register-username" placeholder="Username" required />
      <input type="email" id="register-email" placeholder="Email" required />
      <input type="password" id="register-password" placeholder="Password" required />
      <input type="password" id="register-confirm-password" placeholder="Confirm Password" required />
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <a href="#login">Login here</a></p>
  `;

  // Add event listener for when the form is submitted
  document.getElementById('register-form').addEventListener('submit', handleRegister);
}

// Function to handle the registration process
function handleRegister(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the values entered in the registration form
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;

  // Step 1: Check if the passwords match
  if (password !== confirmPassword) {
    alert('Passwords do not match'); // Show an error if passwords don't match
    return; // Exit the function early
  }

  // Step 2: Check if the password is strong enough
  const passwordStrength = zxcvbn(password); // Use zxcvbn to measure password strength
  if (passwordStrength.score < 3) { // If the password is weak (score < 3)
    alert('Password is too weak'); // Show an error
    return; // Exit the function early
  }

  // Step 3: Check if the email is already registered
  fetch('http://localhost:5000/users?email=' + email) // Fetch users from the database by email
    .then(res => res.json()) // Parse the response into JSON format
    .then(users => {
      // If the email is already registered
      if (users.length > 0) {
        alert('Email is already registered'); // Show an error
        return; // Exit the function early
      }

      // Step 4: Register the new user by sending their data to the server
      fetch('http://localhost:5000/users', {
        method: 'POST', // Using POST method to send data to the server
        body: JSON.stringify({ username, email, password }), // Body includes the new user's details
        headers: { 'Content-Type': 'application/json' } // Setting header to JSON
      })
        .then(() => {
          alert('Registration successful!'); // Show success message
          window.location.hash = '#login'; // Redirect the user to the login page after successful registration
        });
    });
}
