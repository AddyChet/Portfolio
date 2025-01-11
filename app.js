const form = document.querySelector("form");
const input = document.querySelector("#todo-inp");
const list = document.querySelector("#todo-list");
let todoObj = JSON.parse(localStorage.getItem("todos")) || [];

function uuid() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todoObj));
}

function addTodo(todoText) {
    const todoItem = {
      todo: todoText,
      isCompleted: false,
      id: uuid(),
    };
    todoObj.push(todoItem);
    saveTodos();
    renderTodos();
  }

function renderTodos() {
    list.innerHTML = "";
    todoObj.forEach((todoItem) => {
      const li = document.createElement("li");
      li.innerText = todoItem.todo;
  
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.checked = todoItem.isCompleted;
      li.append(checkbox);
  
      taskCompleted(todoItem.isCompleted, li);
  
      checkbox.addEventListener("change", (e) => {
        todoItem.isCompleted = e.target.checked;
        taskCompleted(todoItem.isCompleted, li);
        saveTodos();
      });
  
      const trashBtn = document.createElement("button");
      trashBtn.innerText = "Remove";
      li.append(trashBtn);
  
      trashBtn.addEventListener("click", () => {
        todoObj = todoObj.filter((item) => item.id !== todoItem.id);
        saveTodos();
        renderTodos();
      });
  
      const moveTodoUp = document.createElement("button");
      moveTodoUp.innerText = "️⬆️";
      li.append(moveTodoUp);
      moveTodoUp.addEventListener("click", () => {
        const previousList = li.previousElementSibling;
        if (previousList) {
          const currentList = li;
          list.insertBefore(currentList, previousList);
          saveTodos()
        }
      });
  
      const moveTodoDown = document.createElement("button");
      moveTodoDown.innerText = "️⬇️";
      li.append(moveTodoDown);
      moveTodoDown.addEventListener("click", () => {
        const nextList = li.nextElementSibling;
        if (nextList) {
          const currentList = li;
          list.insertBefore(nextList, currentList); 
          saveTodos()
        }
      });
  
      list.append(li);
    });
  }

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim().length) {
    addTodo(input.value.trim())
    input.value = ""
}});

function taskCompleted(isTrue, li) {
    if (isTrue) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }
  }

renderTodos();
