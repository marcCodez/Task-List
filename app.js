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
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);

}


//Add Task 
function addTask(e){ //it will take in an event object since its an event handler

    const addTaskText = taskInput.value;

    if (addTaskText === '') {
        alert('Add a task')
    }

    // Create li element
    const li = document.createElement('li');
    //Add Class for styling
    li.className = 'collection-item';
    // Create text node and append to li (so whatever is typed in input gets appended)
    li.appendChild(document.createTextNode(addTaskText));
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

//Remove Task
function removeTask(e) {
    // We want to target the a tag not the i tag, since right now its targetting the entire list when we click on it
    //if statmeent meaning, if a parent of an element has class 'delete-item'
  if (e.target.parentElement.classList.contains('delete-item')) {
      if (confirm('Are You Sure?')){
      //Wee need to go up another parent element to access the li element
    e.target.parentElement.parentElement.remove();
  }
  }
}

// Clear Tasks
function clearTasks() {
    //two ways of doing it
    // https://jsperf.com/innerhtml-vs-removechild/571
    // //1. innerHTML = an empty string
    // taskList.innerHTML = '';

    //2. while loop which is actually faster, essentially while theres something still in the list remove it
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

}

// Filter Tasks
function filterTasks(e){
    const filterText = e.target.value.toLowerCase();
    //No we want to take all the list items and loop through them, we can loop through node lists
    document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    //if item in the list in lowercase form exists in the inputted filtered text
    if(item.toLowerCase().indexOf(filterText) !== -1){
        //display them
        task.style.display = 'block';
    } else {
        //display nothing
        task.style.display = 'none';
    }
    });

}