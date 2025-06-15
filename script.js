// script.js

// Declare tasks array globally to be accessible by all functions
let tasks = [];

// Function to save tasks to Local Storage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// 4. Code for Loading Tasks from Local Storage (and 1. Initialize and Load Tasks)
const loadTasks = () => {
    // Retrieve tasks from Local Storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = storedTasks; // Update the global tasks array

    // Populate the task list on the page
    tasks.forEach(taskText => {
        // We pass 'false' to addTask to prevent re-saving to local storage during load
        addTask(taskText, false);
    });
};

// 3. Create the addTask Function (Modified to optionally save to Local Storage)
// The 'save' parameter determines if the task should be saved to Local Storage after adding
const addTask = (taskText, save = true) => {
    // If taskText is not provided (e.g., from user input), get it from the input field
    if (typeof taskText !== 'string') {
        taskText = taskInput.value.trim();
    }

    // Check if taskText is not empty
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Task Creation and Removal (DOM manipulation)
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.classList.add('remove-btn');

    // 3. Implement Task Removal with Local Storage Update
    removeButton.onclick = () => {
        // Remove the task from the DOM
        taskList.removeChild(listItem);

        // Remove the task from the global tasks array
        const index = tasks.indexOf(taskText);
        if (index > -1) {
            tasks.splice(index, 1);
        }

        // Update Local Storage to reflect this change
        saveTasks();
    };

    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);

    // 2. Update Task Addition Functionality (Save to Local Storage if 'save' is true)
    if (save) {
        // After appending the new task to the DOM, update your tasks array
        tasks.push(taskText);
        // Save it back to Local Storage by serializing the array
        saveTasks();
    }

    // Clear the task input field only if it was added via user input
    if (typeof taskInput !== 'undefined' && taskInput.value === taskText) {
        taskInput.value = "";
    }
};

// DOM Elements - These need to be accessible globally or defined within the DOMContentLoaded listener
let addButton;
let taskInput;
let taskList;

// 1. Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {

    // 2. Select DOM Elements
    addButton = document.getElementById('add-button');
    taskInput = document.getElementById('task-input');
    taskList = document.getElementById('task-list');

    // Load existing tasks from Local Storage when the page loads
    loadTasks();

    // 5. Attach Event Listeners
    // Add an event listener to addButton that calls addTask when clicked
    if (addButton) {
        addButton.addEventListener('click', () => addTask()); // Call addTask without arguments for user input
    }

    // Add an event listener to taskInput for 'keypress' event
    if (taskInput) {
        taskInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                addTask(); // Call addTask without arguments for user input
            }
        });
    }
});
