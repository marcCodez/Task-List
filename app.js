//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
    //Add task event
    form.addEventListener('submit', addTask);

}


//Add Task 
function addTask(e){ //it will take in an event object since its an event handler

    if (taskInput.value === '') {
        alert('Add a task')
    }

    // Create li element
    const li = document.createElement('li');
    //Add Class for styling
    li.className = 'collection-item';
    // Create text node and append to li (so whatever is typed in input gets appended)
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a')
    // Add class to link, secondary content added to place it to the right
    link.className = 'delete-item secondary-content';
    // Add icon html inside the link
    link.innerHTML = '<li class="fa fa-remove"ß></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul, taskList because we define the ul to be that variable at the start
    taskList.appendChild(li);

    // Clear input
    taskInput.value = '';

    e.preventDefault(); //ensure to prevent the default behaviour from happening
}
