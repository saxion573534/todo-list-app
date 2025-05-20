const tasksCompletedText = document.getElementById('tasks-completed');
const form = document.querySelector('form');
const taskInputField = document.getElementById('taskfield');

const tasks = [

]

function updateTasksCompleted(tasksCompleted, totalTasks) {
    if (tasksCompleted <= 0) {
        tasksCompletedText.style.visibility = 'hidden';
    } else {
        tasksCompletedText.style.visibility = 'visible';
    }

    tasksCompletedText.innerHTML = `${tasksCompleted} of ${totalTasks} completed`;
}

function getTasksCompleted() {
    let tasksCompleted = 0;
    for (let task of tasks) {
        if (task.complete) {
            tasksCompleted += 1;
        }
    }
    return tasksCompleted;
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
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        for (let task of json) {
            const content = task.content
            const complete = task.complete
            const created = task.created
            // TODO: create task on screen here...
            console.log(content);
        }
    })

console.log('Hello World!');
updateTasksCompleted(getTasksCompleted(), tasks.length);