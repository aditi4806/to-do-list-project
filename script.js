document.addEventListener('DOMContentLoaded', function () {
    const newTaskInput = document.querySelector('#newtask input');
    const addTaskButton = document.querySelector('#newtask button');
    const tasksContainer = document.querySelector('#tasks');

    function createTaskElement(taskContent) {
        // Create a new task element
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        // Task content
        const taskContentElement = document.createElement('span');
        taskContentElement.classList.add('task-content');
        taskContentElement.textContent = taskContent;
        taskElement.appendChild(taskContentElement);

        // Delete button
      /*  const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
        deleteButton.addEventListener('click', function () {
            taskElement.remove();
        });
        taskElement.appendChild(deleteButton);*/

        // Status icons
        const statusIconsElement = document.createElement('span');
        statusIconsElement.classList.add('status-icons');

        // Check icon (for marking as completed)
        const checkIcon = document.createElement('img');
        checkIcon.src = 'images/Checked Image.png';
        checkIcon.alt = 'Checked';
        checkIcon.classList.add('check-icon');
        checkIcon.addEventListener('click', function () {
            taskElement.classList.toggle('completed');
        });
        statusIconsElement.appendChild(checkIcon);

        // Cross icon (for deleting)
        const crossIcon = document.createElement('img');
        crossIcon.src = 'images/wrong cross image.jpg';
        crossIcon.alt = 'Cross';
        crossIcon.classList.add('cross-icon');
        crossIcon.addEventListener('click', function () {
            taskElement.remove();
        });
        statusIconsElement.appendChild(crossIcon);

        taskElement.appendChild(statusIconsElement);

        return taskElement;
    }

    function hideTaskTemplate() {
        const firstTask = tasksContainer.querySelector('.task');
        if (firstTask && firstTask.classList.contains('task-template')) {
           firstTask.style.display = 'none';
        }
    }

    function addTask() {
        const taskContent = newTaskInput.value.trim();

        if (taskContent !== '') {
            // Hide the task template (if present)
            hideTaskTemplate();

            // Create a new task element and append it to the tasks container
            const taskElement = createTaskElement(taskContent);
            tasksContainer.appendChild(taskElement);

            // Clear the input field
            newTaskInput.value = '';
        }
    }

    // Event listener for the "Add" button
    addTaskButton.addEventListener('click', addTask);
});
document.addEventListener('DOMContentLoaded', function () {
    const newTaskInput = document.querySelector('#newtask input');
    const addTaskButton = document.querySelector('#newtask button');
    const tasksContainer = document.querySelector('#tasks');

    // Load tasks from localStorage on page load
    loadTasks();

    function createTaskElement(taskContent) {
        // ... (your existing createTaskElement code)
    }

    function addTask() {
        const taskContent = newTaskInput.value.trim();

        if (taskContent !== '') {
            // Create a new task element and append it to the tasks container
            const taskElement = createTaskElement(taskContent);
            tasksContainer.appendChild(taskElement);

            // Save tasks to localStorage
            saveTasks();

            // Clear the input field
            newTaskInput.value = '';
        }
    }

    function saveTasks() {
        // Get all task elements
        const taskElements = tasksContainer.querySelectorAll('.task');

        // Convert NodeList to an array and extract task content
        const tasksData = Array.from(taskElements).map((taskElement) => {
            return {
                content: taskElement.querySelector('.task-content').textContent,
                completed: taskElement.classList.contains('completed'),
            };
        });

        // Save tasks data to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasksData));
    }

    function loadTasks() {
        // Load tasks data from localStorage
        const tasksData = JSON.parse(localStorage.getItem('tasks')) || [];

        // Create task elements based on the loaded data
        tasksData.forEach((taskData) => {
            const taskElement = createTaskElement(taskData.content);
            if (taskData.completed) {
                taskElement.classList.add('completed');
            }
            tasksContainer.appendChild(taskElement);
        });
    }

    // Event listener for the "Add" button
    addTaskButton.addEventListener('click', addTask);
});

