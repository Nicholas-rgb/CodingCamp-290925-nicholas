const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const dateInput = document.getElementById("dateInput");
const filterInput = document.getElementById("filterInput");
const todoList = document.getElementById("todoList");
const deleteAllBtn = document.getElementById("deleteAllBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
todoForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Please enter a task and select a date!",
      showConfirmButton: false,
      timer: 500
    });
    return;
  }

  const newTask = { text: task, date: date };
  tasks.push(newTask);
  saveTasks();

  Swal.fire({
    icon: "success",
    title: "Task added!",
    showConfirmButton: false,
    timer: 500
  });

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
      li.className = "flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md shadow";

      li.innerHTML = `
        <div>
          <p class="font-medium text-gray-800">${task.text}</p>
          <span class="text-sm text-gray-500">${task.date}</span>
        </div>
        <button 
          class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          onclick="deleteTask(${index})">
          Delete
        </button>
      `;
      todoList.appendChild(li);
    });
}

// Delete single task (no confirmation)
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  Swal.fire({
    icon: "success",
    title: "Deleted!",
    showConfirmButton: false,
    timer: 500
  });
}

// Delete all tasks
deleteAllBtn.addEventListener("click", () => {
  if (tasks.length === 0) {
    Swal.fire({
      icon: "info",
      title: "No tasks to delete",
      showConfirmButton: false,
      timer: 500
    });
    return;
  }
  tasks = [];
  saveTasks();
  renderTasks();
  Swal.fire({
    icon: "success",
    title: "All tasks deleted!",
    showConfirmButton: false,
    timer: 500
  });
});

// Filter tasks
filterInput.addEventListener("keyup", function() {
  renderTasks(this.value);
});

// Render on load
renderTasks();
