let tasks = [];

function renderTasks(tasks) {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = ''; // Clear the list before rendering

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'strike' : '';
    li.innerHTML = `
      <p>${task.detail}</p>
      <div>
        <span data-action="delete">❎</span>
        <span data-action="complete">✅</span>
      </div>
    `;
    todoList.appendChild(li);
  });
}

function newTask() {
  const todoInput = document.getElementById('todo');
  const taskDetail = todoInput.value.trim();
  if (taskDetail) {
    tasks.push({ detail: taskDetail, completed: false });
    renderTasks(tasks);
    todoInput.value = ''; // Clear the input
  }
}

function removeTask(taskElement) {
  tasks = tasks.filter(
    (task) => task.detail != taskElement.querySelector('p').innerText
  );
  taskElement.remove();
}

function completeTask(taskElement) {
  const taskIndex = tasks.findIndex(
    (task) => task.detail === taskElement.querySelector('p').innerText
  );
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  taskElement.classList.toggle('strike');
  console.log(tasks);
}

function manageTasks(event) {
  const action = event.target.dataset.action;
  const taskElement = event.target.closest('li');
  if (action === 'delete') {
    removeTask(taskElement);
  } else if (action === 'complete') {
    completeTask(taskElement);
  }
}

document.getElementById('submitTask').addEventListener('click', newTask);
document.getElementById('todoList').addEventListener('click', manageTasks);
