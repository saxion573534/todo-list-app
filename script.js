const tasksCompletedText = document.getElementById('tasks-completed');
const form = document.querySelector('form');
const taskInputField = document.getElementById('taskfield');
const tasks = document.getElementById('tasks');

let tasksComplete = 0;
let totalTasks = 0;

function updateTasksCompleted() {
    if (totalTasks <= 0) {
        tasksCompletedText.style.visibility = 'hidden';
    } else {
        tasksCompletedText.style.visibility = 'visible';
    }

    tasksCompletedText.innerHTML = `${tasksComplete} of ${totalTasks} tasks completed`;
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
    totalTasks += 1;

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

    closeBtn.addEventListener('click', () => {
        tasks.removeChild(task);
        if (checkbox.checked) {
            tasksComplete -= 1;
        }
        totalTasks -= 1;
        updateTasksCompleted();
    });

    checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
            tasksComplete += 1;
        } else {
            tasksComplete -= 1;
        }
        updateTasksCompleted();
    })

    // checkbox.addEventListener('')
    updateTasksCompleted();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();  // Prevent page refresh on submit
    const task = taskInputField.value.trim();

    if (task) {
        console.log('Adding task:', task);
        createTask(task);
        taskInputField.value = ''; 
    } else {
        console.log('Task is empty!');
    }
});

fetch('../docs/tasks.json')
    .then((response) => response.json())
    .then((tasks) => {
        for (let task of tasks) {
            const content = task.content
            const complete = task.complete
            const created = task.created
            createTask(content)
            console.log(content);
        }
        updateTasksCompleted();
    })

console.log('Hello World!');