document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    const buttons = document.querySelectorAll('.filter-button');

    let tasks = [];

    // Añadir nueva tarea
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = {
                text: taskText,
                completed: false,
                personal: false
            };
            tasks.push(task);
            renderTasks();
            taskInput.value = '';
        } else {
            alert('Por favor, ingrese una tarea.');
        }
    });

    // Manejar filtro de tareas
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            renderTasks(filter);
        });
    });

    // Renderizar tareas
    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;

            // Etiqueta de estado
            const statusLabel = document.createElement('div');
            statusLabel.classList.add('status-label');
            if (task.completed) {
                statusLabel.textContent = 'Completada';
                statusLabel.classList.add('completed');
                li.classList.add('completed');
            } else if (task.personal) {
                statusLabel.textContent = 'Personal';
                statusLabel.classList.add('personal');
            } else {
                statusLabel.textContent = 'Pendiente';
                statusLabel.classList.add('pending');
            }
            
            li.appendChild(statusLabel);

            // Botón para marcar como completado
            const completedButton = document.createElement('button');
            completedButton.textContent = task.completed ? 'Desmarcar' : 'Completar';
            completedButton.addEventListener('click', () => {
                task.completed = !task.completed;
                renderTasks(filter);
            });

            // Botón para marcar como personal
            const personalButton = document.createElement('button');
            personalButton.textContent = task.personal ? 'No personal' : 'Personal';
            personalButton.classList.add('personal');
            personalButton.addEventListener('click', () => {
                task.personal = !task.personal;
                renderTasks(filter);
            });

            // Botón para eliminar tarea
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                renderTasks(filter);
            });

            li.appendChild(completedButton);
            li.appendChild(personalButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });

        updateTaskCount();
    }

    // Actualizar el conteo de tareas
    function updateTaskCount() {
        taskCount.textContent = 'Total de Tareas: ' + tasks.length;
    }
});
