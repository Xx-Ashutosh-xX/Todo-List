const apiUrl = '/api/tasks';

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    document.getElementById('addTaskButton').addEventListener('click', addTask);
    document.getElementById('updateTaskButton').addEventListener('click', updateTask);
    document.getElementById('searchButton').addEventListener('click', searchTaskById);
});

async function loadTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>ID:</strong> ${task.id} <strong>Name:</strong> ${task.name} <strong>Description:</strong> ${task.description}`;

        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'button-group';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button'; // Red button
        deleteButton.onclick = () => deleteTask(task.id);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button'; // Green button
        editButton.onclick = () => editTask(task);

        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);
        li.appendChild(buttonGroup);
        taskList.appendChild(li);
    });
}


async function addTask() {
    const name = document.getElementById('taskName').value.trim();
    const description = document.getElementById('taskDescription').value.trim();

    if (!name) {
        alert('Task name is required!');
        return;
    }

    if (!description) {
        alert('Task description is required!');
        return;
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
    });

    if (response.ok) {
        clearForm();
        loadTasks();
    } else {
        alert('Failed to add task');
    }
}

async function deleteTask(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        loadTasks();
    } else {
        alert('Failed to delete task');
    }
}

function editTask(task) {
    document.getElementById('taskId').value = task.id;
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('formTitle').textContent = 'Edit Task';
    document.getElementById('addTaskButton').style.display = 'none';
    document.getElementById('updateTaskButton').style.display = 'inline';
}

async function updateTask() {
    const id = document.getElementById('taskId').value;
    const name = document.getElementById('taskName').value.trim();
    const description = document.getElementById('taskDescription').value.trim();

    if (!name) {
        alert('Task name is required!');
        return;
    }

    if (!description) {
        alert('Task description is required!');
        return;
    }

    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
    });

    if (response.ok) {
        clearForm();
        loadTasks();
    } else {
        alert('Failed to update task');
    }
}

async function searchTaskById() {
    const id = document.getElementById('searchId').value.trim();
    const searchResultDiv = document.getElementById('searchResult');

    if (!id) {
        alert('Please enter a Task ID to search!');
        return;
    }

    const response = await fetch(`${apiUrl}/${id}`);

    if (response.ok) {
        const task = await response.json();
        searchResultDiv.innerHTML = `<p>${task.name}: ${task.description}</p>`;
    } else {
        searchResultDiv.innerHTML = '<p>Task not found.</p>';
    }
}

function clearForm() {
    document.getElementById('taskId').value = '';
    document.getElementById('taskName').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('formTitle').textContent = 'Add New Task';
    document.getElementById('addTaskButton').style.display = 'inline';
    document.getElementById('updateTaskButton').style.display = 'none';
}
