const users = [];

function switchPage(id) {
  document.querySelectorAll('.form-page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function register() {
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;

  if (!username || !password) {
    alert('All fields are required');
    return;
  }

  if (users.some(user => user.username === username)) {
    alert('Username already exists');
    return;
  }

  users.push({ username, password });
  alert('Registration successful! Please login.');
  switchPage('loginPage');
}

function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    alert('Invalid credentials');
    return;
  }

  
  window.location.href = 'secure.html'; // Redirect after successful login
}
