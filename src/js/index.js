import { renderHomePage } from './views.js';
import { renderLoginPage } from './Login.js';
import { renderRegisterPage } from './Register.js';

document.addEventListener("DOMContentLoaded", () => 
{
  const userInfo = localStorage.getItem("username");
  const userInfoSpan = document.getElementById("user-info");
  const logoutBtn = document.getElementById("logout-btn");
  const loginRegisterLink = document.getElementById("login-register-link");

  if (userInfo) 
  {
    userInfoSpan.textContent = `Welcome, ${userInfo}`;
    logoutBtn.style.display = "inline-block";
    loginRegisterLink.textContent = "Your Account";
  } else 
  {
    userInfoSpan.textContent = '';
    logoutBtn.style.display = "none";
    loginRegisterLink.textContent = "Login/Register";
  }

  // Listen for hash changes in URL to update the page
  window.addEventListener("hashchange", handleRouteChange);

  // Initial route load
  handleRouteChange();

  loginRegisterLink.addEventListener('click', () => 
  {
    if (userInfo) 
    {
      window.location.hash = '#'; // Change the hash to stay on the home page
    } else 
    {
      window.location.hash = '#login'; // Navigate to login page
    }
  });

  logoutBtn.addEventListener('click', () => 
  {
    localStorage.removeItem("username");
    window.location.hash = '#'; // Redirect to home without reloading
  });
});

function handleRouteChange() {
  const hash = window.location.hash;

  if (hash === '#login') {
    renderLoginPage();
  } else if (hash === '#register') {
    renderRegisterPage();
  } else {
    renderHomePage();
  }
}
