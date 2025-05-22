const tasksCompletedText = document.getElementById('tasks-completed');
const form = document.querySelector('form');
const taskInputField = document.getElementById('taskfield');

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
            // TODO: create task on screen here...
            console.log(content);
        }
        updateTasksCompleted(getTasksCompleted(tasks), tasks.length);
    })

console.log('Hello World!');