// Importing the zxcvbn library to check the strength of passwords
import zxcvbn from 'zxcvbn';

// Function to render the home page
export function renderHomePage() {
  // Set the content of the app to display a welcome message and a button to add new password entries
  document.getElementById('app-content').innerHTML = `
    <h2>Welcome to your Password Manager</h2>
    <button id="add-entry-btn">+ Add New Entry</button>
    <div id="entries"></div>
  `;

  // Add an event listener to the "Add New Entry" button
  document.getElementById('add-entry-btn').addEventListener('click', () => {
    // Prompt the user to input details for a new password entry (title, password, and description)
    const title = prompt("Enter the title:");
    const password = prompt("Enter the password:");
    const description = prompt("Enter the description:");

    // If the user provides all required details, save the new entry
    if (title && password && description) {
      const entry = { title, password, description };
      savePasswordEntry(entry); // Save the new password entry
    }
  });

  // Load the password entries from the backend and display them
  loadEntries();
}

// Function to render the login page
export function renderLoginPage() {
  // Set the content of the app to display the login form
  document.getElementById('app-content').innerHTML = `
    <h2>Login</h2>
    <form id="login-form">
      <input type="text" id="login-username-email" placeholder="Username or Email" required />
      <input type="password" id="login-password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="#register">Register here</a></p>
  `;

  // Add an event listener to handle form submission for login
  document.getElementById('login-form').addEventListener('submit', handleLogin);
}

// Function to render the register page
export function renderRegisterPage() {
  // Set the content of the app to display the registration form
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

  // Add an event listener to handle form submission for registration
  document.getElementById('register-form').addEventListener('submit', handleRegister);
}

// Handle the login process
export function handleLogin(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the entered username/email and password
  const usernameEmail = document.getElementById('login-username-email').value;
  const password = document.getElementById('login-password').value;

  // Check if the provided username/email and password match an existing user
  fetch('http://localhost:5000/users?email=' + usernameEmail + '&username=' + usernameEmail)
    .then(res => res.json()) // Parse the response as JSON
    .then(users => {
      const user = users.find(user => user.email === usernameEmail || user.username === usernameEmail);
      if (user && user.password === password) {
        // If the login is successful, store the username in localStorage and navigate to the home page
        localStorage.setItem("username", user.username);
        window.location.href = "#"; // Redirect to home
      } else {
        // If login fails, show an error message
        alert('Incorrect username/email or password');
      }
    });
}

// Handle the registration process
export function handleRegister(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the entered values for username, email, and password
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;

  // Check if the entered passwords match
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // Use zxcvbn to check the strength of the password
  const passwordStrength = zxcvbn(password);
  if (passwordStrength.score < 3) {
    alert('Password is too weak');
    return;
  }

  // Check if the email is already registered
  fetch('http://localhost:5000/users?email=' + email)
    .then(res => res.json()) // Parse the response as JSON
    .then(users => {
      if (users.length > 0) {
        // If the email is already registered, show an error message
        alert('Email is already registered');
        return;
      }

      // If email is not registered, create a new user by sending a POST request
      fetch('http://localhost:5000/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }), // Send the new user's data
        headers: { 'Content-Type': 'application/json' }
      })
        .then(() => {
          // Show success message and redirect to login page
          alert('Registration successful!');
          window.location.href = '#login';
        });
    });
}

// Function to load saved password entries for the logged-in user
function loadEntries() {
  const username = localStorage.getItem('username'); // Get the username of the logged-in user
  // Fetch the password entries for the logged-in user
  fetch(`http://localhost:5000/passwords?user=${username}`)
    .then(res => res.json()) // Parse the response as JSON
    .then(entries => {
      const entriesContainer = document.getElementById('entries'); // Get the container to display the entries
      entriesContainer.innerHTML = ''; // Clear any existing entries
      entries.forEach(entry => {
        // For each entry, display the title, description, and password
        entriesContainer.innerHTML += `
          <div>
            <h3>${entry.title}</h3>
            <p>${entry.description}</p>
            <p>Password: ${entry.password}</p>
          </div>
        `;
      });
    });
}

// Function to save a new password entry
function savePasswordEntry(entry) {
  const username = localStorage.getItem('username'); // Get the username of the logged-in user
  // Send a POST request to save the new password entry
  fetch('http://localhost:5000/passwords', {
    method: 'POST',
    body: JSON.stringify({ ...entry, user: username }), // Add the username to the entry
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json()) // Parse the response as JSON
    .then(() => {
      // Reload the entries after saving the new entry
      loadEntries();
    });
}
