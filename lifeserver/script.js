// Elemente abrufen
const addUrgentButton = document.getElementById('add-urgent');
const addSoonButton = document.getElementById('add-soon');
const viewCompletedButton = document.getElementById('view-completed');
const taskModal = document.getElementById('task-modal');
const completedModal = document.getElementById('completed-modal');
const closeButtons = document.querySelectorAll('.close-button');
const saveTaskButton = document.getElementById('save-task');
const taskInput = document.getElementById('task-input');
const taskCategorySelect = document.getElementById('task-category-select');
const urgentTasksList = document.getElementById('urgent-tasks');
const soonTasksList = document.getElementById('soon-tasks');
const completedTasksList = document.getElementById('completed-tasks');

// Aufgaben speichern
let tasks = {
    urgent: [],
    soon: [],
    completed: []
};

// Funktionen zum Anzeigen der Modal
function showModal(modal) {
    modal.style.display = 'flex';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// Event Listener für Öffnen der Modal
addUrgentButton.addEventListener('click', () => {
    taskCategorySelect.value = 'urgent';
    showModal(taskModal);
});

addSoonButton.addEventListener('click', () => {
    taskCategorySelect.value = 'soon';
    showModal(taskModal);
});

viewCompletedButton.addEventListener('click', () => {
    showModal(completedModal);
});

// Event Listener für Schließen der Modal
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        closeModal(button.parentElement.parentElement);
    });
});

// Event Listener zum Speichern der Aufgabe
saveTaskButton.addEventListener('click', () => {
    const taskTitle = taskInput.value.trim();
    const category = taskCategorySelect.value;

    if (taskTitle === '') {
        alert('Bitte geben Sie einen Aufgabentitel ein.');
        return;
    }

    const task = {
        id: Date.now(),
        title: taskTitle
    };

    tasks[category].push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    closeModal(taskModal);
});

// Funktion zum Rendern der Aufgaben
function renderTasks() {
    // Leeren der aktuellen Listen
    urgentTasksList.innerHTML = '';
    soonTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    // Dringende Aufgaben
    tasks.urgent.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.textContent = task.title;

        const completeButton = document.createElement('button');
        completeButton.textContent = '✓';
        completeButton.style.background = 'none';
        completeButton.style.border = 'none';
        completeButton.style.color = '#FFD700';
        completeButton.style.cursor = 'pointer';
        completeButton.style.fontSize = '1.2rem';
        completeButton.addEventListener('click', () => markAsCompleted(task.id, 'urgent'));

        li.appendChild(completeButton);
        urgentTasksList.appendChild(li);
    });

    // Bald Aufgaben
    tasks.soon.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.textContent = task.title;

        const completeButton = document.createElement('button');
        completeButton.textContent = '✓';
        completeButton.style.background = 'none';
        completeButton.style.border = 'none';
        completeButton.style.color = '#FFD700';
        completeButton.style.cursor = 'pointer';
        completeButton.style.fontSize = '1.2rem';
        completeButton.addEventListener('click', () => markAsCompleted(task.id, 'soon'));

        li.appendChild(completeButton);
        soonTasksList.appendChild(li);
    });

    // Erledigte Aufgaben
    tasks.completed.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.title;
        completedTasksList.appendChild(li);
    });
}

// Funktion zum Markieren als erledigt
function markAsCompleted(taskId, category) {
    const taskIndex = tasks[category].findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        const [completedTask] = tasks[category].splice(taskIndex, 1);
        tasks.completed.push(completedTask);
        saveTasks();
        renderTasks();
    }
}

// Klick außerhalb des Modals schließt es
window.onclick = function(event) {
    if (event.target == taskModal) {
        closeModal(taskModal);
    }
    if (event.target == completedModal) {
        closeModal(completedModal);
    }
}

// Aufgaben aus localStorage laden
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Aufgaben in localStorage speichern
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Beim Laden der Seite
window.onload = function() {
    loadTasks();
    renderTasks();
};
