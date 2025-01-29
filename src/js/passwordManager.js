import zxcvbn from 'zxcvbn';

// Render home page
export function renderHomePage() 
{
  document.getElementById('app-content').innerHTML = `
    <h2>Welcome to your Password Manager</h2>
    <button id="add-entry-btn">+ Add New Entry</button>
    <div id="entries"></div>
  `;

  document.getElementById('add-entry-btn').addEventListener('click', () => 
  {
    const title = prompt("Enter the title:");
    const password = prompt("Enter the password:");
    const description = prompt("Enter the description:");

    if (title && password && description) 
    {
      const entry = { title, password, description };
      savePasswordEntry(entry);
    }
  });

  loadEntries();
}

// Render the login form
export function renderLoginPage() 
{
  document.getElementById('app-content').innerHTML = `
    <h2>Login</h2>
    <form id="login-form">
      <input type="text" id="login-username-email" placeholder="Username or Email" required />
      <input type="password" id="login-password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="#register">Register here</a></p>
  `;

  document.getElementById('login-form').addEventListener('submit', handleLogin);
}

// Render the register form
export function renderRegisterPage() 
{
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

  document.getElementById('register-form').addEventListener('submit', handleRegister);
}

// Handle login
export function handleLogin(event) 
{
  event.preventDefault();

  const usernameEmail = document.getElementById('login-username-email').value;
  const password = document.getElementById('login-password').value;

  fetch('http://localhost:5000/users?email=' + usernameEmail + '&username=' + usernameEmail)
    .then(res => res.json())
    .then(users => {
      const user = users.find(user => user.email === usernameEmail || user.username === usernameEmail);
      if (user && user.password === password) 
      {
        localStorage.setItem("username", user.username);
        window.location.href = "#";
      } 
      else 
      {
        alert('Incorrect username/email or password');
      }
    });
}

// Handle registration
export function handleRegister(event) 
{
  event.preventDefault();

  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;

  if (password !== confirmPassword) 
  {
    alert('Passwords do not match');
    return;
  }

  const passwordStrength = zxcvbn(password);
  if (passwordStrength.score < 3) 
  {
    alert('Password is too weak');
    return;
  }

  fetch('http://localhost:5000/users?email=' + email)
    .then(res => res.json())
    .then(users => {
      if (users.length > 0) 
      {
        alert('Email is already registered');
        return;
      }

      fetch('http://localhost:5000/users', 
      {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(() => 
        {
          alert('Registration successful!');
          window.location.href = '#login';
        });
    });
}

// Load saved password entries
function loadEntries() {
  const username = localStorage.getItem('username');
  fetch(`http://localhost:5000/passwords?user=${username}`)
    .then(res => res.json())
    .then(entries => {
      const entriesContainer = document.getElementById('entries');
      entriesContainer.innerHTML = '';
      entries.forEach(entry => {
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

// Save password entry
function savePasswordEntry(entry) {
  const username = localStorage.getItem('username');
  fetch('http://localhost:5000/passwords', {
    method: 'POST',
    body: JSON.stringify({ ...entry, user: username }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(() => {
    loadEntries();
  });
}
