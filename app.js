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
    //DOM Load Event
    //DOMContentLoaded is an event that gets called right after the DOM has kiaded
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);

}

// Get Tasks from Local Storage
function getTasks() {
    let tasks;
    //If there are no tasks in the local storage set it to an empty area
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        //if there are tasks, set it to whatever is there
        //since local storage only stores string we need to convert it to a JS object
        //tasks is basically where all the inputted tasks go to
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //this forEach will execute for each task in the LS
    //After copying we replace addTaskText to task so it doesnt exist in this scope and it wouldnt make sense
tasks.forEach(function(task){
 //We basically want to create the DOM elements just like we did with Add task, so we can copy it
  // Create li element
  const li = document.createElement('li');
  //Add Class for styling
  li.className = 'collection-item';
  // Create text node and append to li (so whatever is typed in input gets appended)
  li.appendChild(document.createTextNode(task)); 
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
});

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

    // Store in Local Storage
    storeTaskInLocalStorage(addTaskText);

    // Clear input
    taskInput.value = '';

    e.preventDefault(); //ensure to prevent the default behaviour from happening
}

// Store Task
function storeTaskInLocalStorage(task) {
let tasks;
//If there are no tasks in the local storage set it to an empty area
if (localStorage.getItem('tasks') === null){
    tasks = [];
} else {
     //if there are tasks, set it to whatever is there
    //since local storage only stores string we need to convert it to a JS object
    //tasks is basically where all the inputted tasks go to
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

// Push onto that variable JS object
tasks.push(task);
// then we set it back to local storage, and change it back to a string
localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
    // We want to target the a tag not the i tag, since right now its targetting the entire list when we click on it
    //if statmeent meaning, if a parent of an element has class 'delete-item'
  if (e.target.parentElement.classList.contains('delete-item')) {
      if (confirm('Are You Sure?')){
      //Wee need to go up another parent element to access the li element
    e.target.parentElement.parentElement.remove();

    // Remove from Local Storage
    //We dont actually have an id or anything we can pass here so we have to pass in the actual element (the li)
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
  }
}

// Remove from Local Storage, We do a similar thing again
function removeTaskFromLocalStorage(taskItem){
    let tasks;
//If there are no tasks in the local storage set it to an empty area
if (localStorage.getItem('tasks') === null){
    tasks = [];
} else {
     //if there are tasks, set it to whatever is there
    //since local storage only stores string we need to convert it to a JS object
    //tasks is basically where all the inputted tasks go to
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function(task, index){
//if the textContent of the passed element (or task in our list) matches with the current task in the iteration of LS
if (taskItem.textContent === task){
    // we can specify index, and pass it to our function
    //So here we are deleting 1 element from the index
tasks.splice(index, 1);
}
});
// we set the local storage again

localStorage.setItem('tasks', JSON.stringify(tasks));
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

    // Clear from Local Storage
    clearTasksFromLocalStorage();
}

// Clear Tasks from Local Storage - REALLY SIMPLE
function clearTasksFromLocalStorage(){
 localStorage.clear();
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