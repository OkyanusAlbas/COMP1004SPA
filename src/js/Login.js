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
  
  function handleLogin(event) 
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
          window.location.hash = '#'; // Change the hash without full page reload
        } else 
        {
          alert('Incorrect username/email or password');
        }
      });
  }
  