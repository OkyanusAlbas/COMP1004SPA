import zxcvbn from 'zxcvbn';

export function renderRegisterPage() {
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

function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  const passwordStrength = zxcvbn(password);
  if (passwordStrength.score < 3) {
    alert('Password is too weak');
    return;
  }

  fetch('http://localhost:5000/users?email=' + email)
    .then(res => res.json())
    .then(users => {
      if (users.length > 0) {
        alert('Email is already registered');
        return;
      }

      fetch('http://localhost:5000/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(() => {
          alert('Registration successful!');
          window.location.hash = '#login'; // After successful registration, go to login page
        });
    });
}
