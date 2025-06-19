document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Modified addTask function with optional save parameter
    function addTask(taskText = null, save = true) {
        // Get task text from input or parameter
        const text = taskText || taskInput.value.trim();
        
        if (text === "") {
            alert("Please enter a task.");
            return;
        }

        // Create task element
        const listItem = document.createElement('li');
        listItem.textContent = text;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn'; // Fixed: was using classList.add incorrectly
        
        // Remove task functionality with Local Storage update
        removeButton.onclick = () => {
            taskList.removeChild(listItem);
            removeTaskFromStorage(text);
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear input only if adding from user input
        if (!taskText) {
            taskInput.value = "";
        }

        // Save to Local Storage if save is true
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Load existing tasks when page loads
    loadTasks();

    // Event listeners
    addButton.addEventListener('click', () => addTask());
    
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});