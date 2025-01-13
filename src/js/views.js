export function renderHomePage() {
    document.getElementById('app-content').innerHTML = `
      <h2>Welcome to your Password Manager</h2>
      <button id="add-entry-btn">+ Add New Entry</button>
      <div id="entries"></div>
    `;
  
    document.getElementById('add-entry-btn').addEventListener('click', () => {
      const title = prompt("Enter the title:");
      const password = prompt("Enter the password:");
      const description = prompt("Enter the description:");
  
      if (title && password && description) {
        const entry = { title, password, description };
        savePasswordEntry(entry);
      }
    });
  
    loadEntries();
  }
  
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
  