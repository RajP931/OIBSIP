let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editId = null;

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Format timestamp
function formatDate(date) {
  return new Date(date).toLocaleString();
}

// Add or update a task
function addOrUpdateTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  // Capitalize first letter
  const formattedText = text.charAt(0).toUpperCase() + text.slice(1);

  if (editId !== null) {
    const task = tasks.find(t => t.id === editId);
    task.text = formattedText;
    editId = null;
  } else {
    tasks.push({
      id: Date.now(),
      text: formattedText,
      completed: false,
      createdAt: new Date(),
      completedAt: null
    });
  }

  input.value = "";
  saveTasks();
  renderTasks();
}

// Mark task complete/incomplete
function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id
      ? {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date() : null
        }
      : task
  );
  saveTasks();
  renderTasks();
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

// Edit a task
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  document.getElementById("taskInput").value = task.text;
  editId = id;
}

// Render all tasks to the page
function renderTasks() {
  const pendingEl = document.getElementById("pendingTasks");
  const completedEl = document.getElementById("completedTasks");

  pendingEl.innerHTML = "";
  completedEl.innerHTML = "";

  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.className = `task ${task.completed ? "completed" : ""}`;
    taskDiv.innerHTML = `
      <p>${task.text}</p>
      <div class="timestamp">Added: ${formatDate(task.createdAt)}</div>
      ${task.completed ? `<div class="timestamp">Completed: ${formatDate(task.completedAt)}</div>` : ""}
      <div class="actions">
        <button onclick="toggleComplete(${task.id})">
          <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i>
        </button>
        <button onclick="editTask(${task.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button onclick="deleteTask(${task.id})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;

    (task.completed ? completedEl : pendingEl).appendChild(taskDiv);
  });
}

// Initial render
renderTasks();
