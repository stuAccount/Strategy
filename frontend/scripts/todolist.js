var addButton = document.getElementById("add-button");
var todoList = document.getElementById("todo-list");
var todoInput = document.getElementById("todo-input");

function fetchTodos() {
  fetch("http://localhost:8080/api/todos", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((todos) => {
      todoList.innerHTML = "";
      todos.forEach((todo) => {
        const li = document.createElement("li");
        li.classList.add("todo-item"); // Class of li is todo-item

        // Checkbox for completed for each list
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("todo-checkbox");
        checkbox.checked = todo.completed;
        checkbox.onchange = function () {
          updateTodo(todo.id, todo.title, checkbox.checked);
        };

        // Editable span for title
        const span = document.createElement("span");
        span.classList.add("todo-span");
        span.textContent = todo.title;
        span.contentEditable = true;
        span.onblur = function () {
          if (span.textContent != todo.title) {
            updateTodo(todo.id, span.textContent, todo.completed);
          }
        };

        // Delete buttons
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.classList.add("delete-button");
        delBtn.textContent = "🗑️";
        delBtn.onclick = function () {
          deleteTodo(todo.id);
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delBtn);
        todoList.appendChild(li);
      });
    });
}

function createTodo() {
  if (todoInput.value == "") {
    return;
  }
  fetch("http://localhost:8080/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: todoInput.value, completed: false }),
  })
    .then((response) => response.json())
    .then(fetchTodos)
    .then(clearTodoInput);
}

function updateTodo(id, newTitle, newcompleted) {
  fetch(`http://localhost:8080/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newTitle, completed: newcompleted }),
  }).then(fetchTodos);
}

function deleteTodo(id) {
  fetch(`http://localhost:8080/api/todos/${id}`, {
    method: "DELETE",
  }).then(fetchTodos);
}

function clearTodoInput() {
  todoInput.value = "";
}

window.onload = fetchTodos;

addButton.onclick = createTodo;
