import { renderHomePage, renderLoginPage, renderRegisterPage, handleLogin, handleRegister } from './passwordManager.js';

document.addEventListener("DOMContentLoaded", () => {
  const userInfo = localStorage.getItem("username");
  const userInfoSpan = document.getElementById("user-info");
  const logoutBtn = document.getElementById("logout-btn");
  const loginRegisterLink = document.getElementById("login-register-link");

  if (userInfo) {
    userInfoSpan.textContent = `Welcome, ${userInfo}`;
    logoutBtn.style.display = "inline-block";
    loginRegisterLink.textContent = "Your Account";
  } else {
    userInfoSpan.textContent = '';
    logoutBtn.style.display = "none";
    loginRegisterLink.textContent = "Login/Register";
  }

  // Listen for hash changes in URL to update the page
  window.addEventListener("hashchange", handleRouteChange);

  // Initial route load
  handleRouteChange();

  loginRegisterLink.addEventListener('click', () => {
    if (userInfo) {
      window.location.href = '/';
    } else {
      window.location.href = '#login';
    }
  });

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem("username");
    window.location.href = "#";
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
