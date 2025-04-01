// Import functions from other modules for rendering different pages
import { renderHomePage } from './views.js';  // Renders the home page
import { renderLoginPage } from './Login.js'; // Renders the login page
import { renderRegisterPage } from './Register.js'; // Renders the registration page

// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  
  // Retrieve the username from localStorage to check if the user is logged in
  const userInfo = localStorage.getItem("username");
  
  // Get the references to various DOM elements that will be manipulated
  const userInfoSpan = document.getElementById("user-info"); // Displays user info (e.g., "Welcome, user")
  const logoutBtn = document.getElementById("logout-btn"); // Logout button
  const loginRegisterLink = document.getElementById("login-register-link"); // Link to login/register or account page

  // Check if there is a logged-in user
  if (userInfo) {
    // If the user is logged in, update the UI to reflect their username
    userInfoSpan.textContent = `Welcome, ${userInfo}`;
    logoutBtn.style.display = "inline-block"; // Show the logout button
    loginRegisterLink.textContent = "Your Account"; // Change link text to "Your Account"
  } else {
    // If the user is not logged in, clear the user info and hide the logout button
    userInfoSpan.textContent = '';
    logoutBtn.style.display = "none"; // Hide the logout button
    loginRegisterLink.textContent = "Login/Register"; // Change link text to "Login/Register"
  }

  // Listen for changes in the URL hash (part of the URL after the '#' symbol)
  window.addEventListener("hashchange", handleRouteChange);

  // Call the function to load the appropriate page based on the current hash in the URL
  handleRouteChange();

  // Event listener for the login/register link
  loginRegisterLink.addEventListener('click', () => {
    // If the user is logged in, stay on the home page by setting the hash to '#'
    if (userInfo) {
      window.location.hash = '#'; // Stay on the home page
    } else {
      // If the user is not logged in, navigate to the login page
      window.location.hash = '#login'; // Navigate to the login page
    }
  });

  // Event listener for the logout button
  logoutBtn.addEventListener('click', () => {
    // Remove the username from localStorage to log the user out
    localStorage.removeItem("username");
    // Redirect to the home page by changing the hash to '#', without reloading the page
    window.location.hash = '#'; // Redirect to home
  });
});

// Function to handle changes in the URL hash and update the page accordingly
function handleRouteChange() {
  const hash = window.location.hash; // Get the current URL hash

  // Check the hash and render the appropriate page
  if (hash === '#login') {
    renderLoginPage(); // If the hash is '#login', show the login page
  } else if (hash === '#register') {
    renderRegisterPage(); // If the hash is '#register', show the register page
  } else {
    renderHomePage(); // If the hash is anything else (or empty), show the home page
  }
}
