// Function to render the home page content
export function renderHomePage() {
  // Set the HTML content for the home page inside the 'app-content' element
  document.getElementById('app-content').innerHTML = `
    <h2>Welcome to your Password Manager</h2>
    <button id="add-entry-btn">+ Add New Entry</button>
    <div id="entries"></div>
  `;

  // Add an event listener to the 'Add New Entry' button to open a prompt for adding a password entry
  document.getElementById('add-entry-btn').addEventListener('click', () => {
    // Prompt the user for the title, password, and description of the new entry
    const title = prompt("Enter the title:");
    const password = prompt("Enter the password:");
    const description = prompt("Enter the description:");

    // If all fields are filled, create the entry and save it
    if (title && password && description) {
      const entry = { title, password, description };
      savePasswordEntry(entry); // Call the savePasswordEntry function to store the entry
    }
  });

  // Load all the password entries to display on the page
  loadEntries();
}

// Function to load all password entries for the logged-in user
function loadEntries() {
  // Retrieve the username from localStorage
  const username = localStorage.getItem('username');

  // Fetch the password entries from the server using the username
  fetch(`http://localhost:5000/passwords?user=${username}`)
    .then(res => res.json())  // Parse the response as JSON
    .then(entries => {
      // Get the container where entries will be displayed
      const entriesContainer = document.getElementById('entries');
      entriesContainer.innerHTML = ''; // Clear the container before adding new entries

      // Loop through each entry and append it to the container
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

// Function to save a new password entry
function savePasswordEntry(entry) {
  // Retrieve the username from localStorage (to associate the entry with the logged-in user)
  const username = localStorage.getItem('username');

  // Send the new password entry to the server using a POST request
  fetch('http://localhost:5000/passwords', {
    method: 'POST', // Use POST method to create a new entry
    body: JSON.stringify({ ...entry, user: username }), // Include the user info and the new entry details
    headers: { 'Content-Type': 'application/json' } // Set the content type to JSON
  })
  .then(res => res.json())  // Parse the response as JSON
  .then(() => {
    // After saving the entry, reload the entries to reflect the new one
    loadEntries();
  });
}
