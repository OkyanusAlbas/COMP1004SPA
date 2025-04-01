// Import functions from 'passwordManager.js' for rendering pages and handling login/register
import { renderHomePage, renderLoginPage, renderRegisterPage, handleLogin, handleRegister } from './passwordManager.js';

// Wait for the document to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  
  // Retrieve the username from localStorage to check if the user is logged in
  const userInfo = localStorage.getItem("username");
  
  // Get references to DOM elements to update the UI
  const userInfoSpan = document.getElementById("user-info"); // Displays user information
  const logoutBtn = document.getElementById("logout-btn"); // Logout button
  const loginRegisterLink = document.getElementById("login-register-link"); // Link to login/register or account page

  // Check if the user is logged in by checking for a username in localStorage
  if (userInfo) {
    // If logged in, display a welcome message with the user's username
    userInfoSpan.textContent = `Welcome, ${userInfo}`;
    logoutBtn.style.display = "inline-block"; // Show the logout button
    loginRegisterLink.textContent = "Your Account"; // Change the link text to "Your Account"
  } else {
    // If not logged in, hide the logout button and update the link text
    userInfoSpan.textContent = '';
    logoutBtn.style.display = "none"; // Hide the logout button
    loginRegisterLink.textContent = "Login/Register"; // Change the link text to "Login/Register"
  }

  // Listen for hash changes in the URL to update the displayed page
  window.addEventListener("hashchange", handleRouteChange);

  // Call handleRouteChange to load the initial page based on the current URL hash
  handleRouteChange();

  // Event listener for the login/register link to navigate based on the user's login status
  loginRegisterLink.addEventListener('click', () => {
    if (userInfo) {
      // If logged in, redirect to the home page
      window.location.href = '/'; // Redirect to home
    } else {
      // If not logged in, redirect to the login page
      window.location.href = '#login'; // Navigate to the login page
    }
  });

  // Event listener for the logout button
  logoutBtn.addEventListener('click', () => {
    // Remove the username from localStorage to log the user out
    localStorage.removeItem("username");
    // Redirect the user to the home page
    window.location.href = "#"; // Redirect to home page
  });
});

// Function to handle route changes based on the current URL hash
function handleRouteChange() {
  const hash = window.location.hash; // Get the current URL hash

  // Depending on the hash, render the appropriate page
  if (hash === '#login') {
    renderLoginPage(); // If the hash is '#login', render the login page
  } else if (hash === '#register') {
    renderRegisterPage(); // If the hash is '#register', render the register page
  } else {
    renderHomePage(); // If the hash is anything else (or empty), render the home page
  }
}
