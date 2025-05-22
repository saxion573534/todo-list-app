const tasksCompletedText = document.getElementById('tasks-completed');
const form = document.querySelector('form');
const taskInputField = document.getElementById('taskfield');
const tasks = document.getElementById('tasks');

function updateTasksCompleted(tasksCompleted, totalTasks) {
    if (tasksCompleted <= 0) {
        tasksCompletedText.style.visibility = 'hidden';
    } else {
        tasksCompletedText.style.visibility = 'visible';
    }

    tasksCompletedText.innerHTML = `${tasksCompleted} of ${totalTasks} tasks completed`;
}

function getTasksCompleted(tasks) {
  return tasks.filter(task => task.complete).length;
}

function createTask(title) {
    // <div class="task">
    //     <input class="checkbox" type="checkbox"/>
    //     <p class="task-title">leetcode exercises</p>
    //     <button class="close-task">X</button>
    // </div>

    const task = document.createElement('div');
    task.className = 'task';

    const checkbox = document.createElement('input');
    checkbox.className = 'checkbox';
    checkbox.type = 'checkbox';

    const taskTitle = document.createElement('p');
    taskTitle.className = 'task-title';
    taskTitle.textContent = title;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-task';
    closeBtn.textContent = 'X';

    task.appendChild(checkbox);
    task.appendChild(taskTitle);
    task.appendChild(closeBtn);

    tasks.appendChild(task);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();  // Prevent page refresh on submit
    const task = taskInputField.value.trim();

    if (task) {
        console.log('Adding task:', task);
        taskInputField.value = ''; 
    } else {
        console.log('Task is empty!');
    }
});

fetch('../tasks.json')
    .then((response) => response.json())
    .then((tasks) => {
        for (let task of tasks) {
            const content = task.content
            const complete = task.complete
            const created = task.created
            createTask(content)
            console.log(content);
        }
        updateTasksCompleted(getTasksCompleted(tasks), tasks.length);
    })

console.log('Hello World!');