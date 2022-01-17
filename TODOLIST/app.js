const form = document.getElementById("todo-form");
const addInput = document.querySelector("#add-input");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector("#search-input");
const firstBody = document.querySelectorAll(".body")[0];
const secondBody = document.querySelectorAll(".body")[1];
const clearAllBtn = document.querySelector("#clear-all");

eventListeners();
function eventListeners() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodo);
  clearAllBtn.addEventListener("click", clearAllTodos);
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert-${type}`;
  alert.textContent = message;
  firstBody.appendChild(alert);
  setTimeout(() => alert.remove(), 1000);
}

function getTodoFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodoFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodoFromStorage(todo) {
  let todos = getTodoFromStorage();
  todos.forEach((item, index) => {
    if (todo === item) todos.splice(index, 1);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearAllTodos() {
  if (confirm("Are you sure to delete all tasks?")) {
    while (todoList.firstElementChild !== null) {
      todoList.firstElementChild.remove();
    }
    // todoList.innerHTML = "";
    localStorage.removeItem("todos");
  }
}

function filterTodo(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-item");

  listItems.forEach((item) => {
    const text = item.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      item.setAttribute("style", "display: none !important");
    } else {
      item.setAttribute("style", "display: flex");
    }
  });
}

function loadAllTodosToUI() {
  let todos = getTodoFromStorage();
  todos.forEach((todo) => addTodoToUI(todo));
}

function deleteTodo(e) {
  if (e.target.className === "fas fa-trash") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Successfully deleted");
  }
}

function addTodoToUI(newTodo) {
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");
  listItem.textContent = newTodo;
  const deleteItem = document.createElement("a");
  deleteItem.href = "#";
  deleteItem.classList.add("delete-item");
  const trashIcon = document.createElement("i");
  trashIcon.className = "fas fa-trash";
  listItem.appendChild(deleteItem);
  deleteItem.appendChild(trashIcon);
  todoList.appendChild(listItem);
}

function addTodo(e) {
  const newTodo = addInput.value.trim();

  if (newTodo === "") {
    showAlert("warning", "Field is empty, please add a new todo..");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Succesfully added");
  }
  addInput.value = "";
  e.preventDefault();
}
