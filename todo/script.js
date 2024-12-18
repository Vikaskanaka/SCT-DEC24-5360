const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(taskInput.value, taskDate.value);
  taskInput.value = '';
  taskDate.value = '';
});

function addTask(taskText, dueDate) {
  const taskItem = document.createElement('li');

  const taskContent = document.createElement('span');
  taskContent.textContent = `${taskText} (Due: ${formatDate(dueDate)})`;
  taskItem.appendChild(taskContent);

  const completeButton = document.createElement('button');
  completeButton.textContent = 'Complete';
  completeButton.addEventListener('click', () => {
    taskItem.classList.toggle('completed');
  });
  taskItem.appendChild(completeButton);

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => editTask(taskItem, taskContent));
  taskItem.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => taskList.removeChild(taskItem));
  taskItem.appendChild(deleteButton);


  taskList.appendChild(taskItem);
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function editTask(taskItem, taskContent) {
  const newTaskText = prompt('Edit task:', taskContent.textContent.split(' (Due: ')[0]);
  const newDueDate = prompt('Edit due date (YYYY-MM-DDTHH:MM):', taskContent.textContent.split('Due: ')[1].slice(0, -1));
  
  if (newTaskText && newDueDate) {
    taskContent.textContent = `${newTaskText} (Due: ${formatDate(newDueDate)})`;
  }
}
