const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const dateInput = document.getElementById("dateInput");
const filterInput = document.getElementById("filterInput");
const todoList = document.getElementById("todoList");

let tasks = [];

// Add task
todoForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Please enter a task and select a date!");
    return;
  }

  const newTask = { text: task, date: date };
  tasks.push(newTask);

  renderTasks();
  todoForm.reset();
});

// Render tasks
function renderTasks(filter = "") {
  todoList.innerHTML = "";

  tasks
    .filter(task => task.text.toLowerCase().includes(filter.toLowerCase()))
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${task.text} - <small>${task.date}</small></span>
        <button class="delete-btn" onclick="deleteTask(${index})">X</button>
      `;
      todoList.appendChild(li);
    });
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(filterInput.value);
}

// Filter tasks
filterInput.addEventListener("keyup", function() {
  renderTasks(this.value);
});
