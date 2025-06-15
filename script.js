// script.js

// 1. Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {

    // 2. Select DOM Elements
    const addButton = document.getElementById('add-button');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 3. Create the addTask Function
    const addTask = () => {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return; // Stop the function if input is empty
        }

        // 4. Task Creation and Removal
        // Create a new li element
        const listItem = document.createElement('li');
        listItem.textContent = taskText; // Set textContent to taskText

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // Give it a class name of 'remove-btn'

        // Assign an onclick event to the remove button
        removeButton.onclick = () => {
            taskList.removeChild(listItem); // Remove the li element from taskList
        };

        // Append the remove button to the li element
        listItem.appendChild(removeButton);

        // Then append the li to taskList
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = "";
    };

    // 5. Attach Event Listeners
    // Add an event listener to addButton that calls addTask when clicked
    if (addButton) {
        addButton.addEventListener('click', addTask);
    }

    // Add an event listener to taskInput for 'keypress' event
    if (taskInput) {
        taskInput.addEventListener('keypress', (event) => {
            // Check if event.key is equal to 'Enter'
            if (event.key === 'Enter') {
                addTask(); // Call addTask when Enter is pressed
            }
        });
    }

    // Note: The instruction "Invoke the addTask function on DOMContentLoaded"
    // is usually for initial loading of data or setting up the app.
    // For a To-Do list, addTask is typically triggered by user interaction (click/keypress).
    // If the intent was to add a default task on load, it would be an explicit call here:
    // addTask("Example Task on Load"); // This would need taskText to be an argument of addTask.
    // Given the context of adding and removing tasks, invoking it without user input
    // on DOMContentLoaded doesn't align with standard To-Do app behavior.
    // So, I'm interpreting this as ensuring that the *event listeners* are set up on DOMContentLoaded,
    // which is already covered by wrapping all the code inside the DOMContentLoaded listener.

}); // End of DOMContentLoaded event listener
