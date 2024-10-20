document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');

    const allTasksButton = document.getElementById('allTasks');
    const personalTasksButton = document.getElementById('personalTasks');
    const pendingTasksButton = document.getElementById('pendingTasks');
    const completedTasksButton = document.getElementById('completedTasks');

    let tasks = []; // Array para almacenar las tareas
    let filter = 'all'; // Filtro por defecto

    // Añadir nueva tarea
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = {
                text: taskText,
                completed: false,
                personal: false,
                pending: true
            };
            tasks.push(task); // Agregar tarea al array
            renderTasks(); // Renderizar las tareas
            taskInput.value = ''; // Limpiar el campo de entrada
        } else {
            alert('Por favor, ingrese una tarea.');
        }
    });

    // Filtro de tareas
    allTasksButton.addEventListener('click', () => setFilter('all'));
    personalTasksButton.addEventListener('click', () => setFilter('personal'));
    pendingTasksButton.addEventListener('click', () => setFilter('pending'));
    completedTasksButton.addEventListener('click', () => setFilter('completed'));

    function setFilter(newFilter) {
        filter = newFilter;
        renderTasks();
    }

    // Renderizar tareas
    function renderTasks() {
        taskList.innerHTML = ''; // Limpiar la lista
        tasks.forEach((task, index) => {
            if (filter === 'all' || 
               (filter === 'completed' && task.completed) || 
               (filter === 'pending' && task.pending && !task.completed) ||
               (filter === 'personal' && task.personal)) {
                const li = document.createElement('li');
                li.textContent = task.text;

                if (task.completed) li.classList.add('completed');

                // Botón para marcar como completado
                const completedButton = document.createElement('button');
                completedButton.textContent = task.completed ? 'Desmarcar' : 'Completar';
                completedButton.addEventListener('click', () => {
                    task.completed = !task.completed;
                    task.pending = false;
                    renderTasks();
                });

                // Botón para marcar como personal
                const personalButton = document.createElement('button');
                personalButton.textContent = task.personal ? 'No personal' : 'Personal';
                personalButton.classList.add('personal');
                personalButton.addEventListener('click', () => {
                    task.personal = !task.personal;
                    renderTasks();
                });

                // Botón para eliminar tarea
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => {
                    tasks.splice(index, 1);
                    renderTasks();
                });

                li.appendChild(completedButton);
                li.appendChild(personalButton);
                li.appendChild(deleteButton);
                taskList.appendChild(li);
            }
        });

        updateTaskCount();
    }

    // Actualizar el conteo de tareas
    function updateTaskCount() {
        taskCount.textContent = 'Total de Tareas: ' + tasks.length;
    }
});
