document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const filterTasks = document.getElementById('filterTasks');
    const taskCount = document.getElementById('taskCount');

    let tasks = []; // Array para almacenar las tareas

    // Añadir nueva tarea
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = {
                text: taskText,
                completed: false,
                personal: false // Nueva propiedad para las tareas personales
            };
            tasks.push(task); // Agregar tarea al array
            renderTasks(); // Renderizar las tareas
            taskInput.value = ''; // Limpiar el campo de entrada
        } else {
            alert('Por favor, ingrese una tarea.');
        }
    });

    // Renderizar tareas
    function renderTasks() {
        taskList.innerHTML = ''; // Limpiar la lista
        tasks.forEach((task, index) => {
            if (filterTasks.value === 'all' || 
               (filterTasks.value === 'completed' && task.completed) || 
               (filterTasks.value === 'pending' && !task.completed) ||
               (filterTasks.value === 'personal' && task.personal)) {
                const li = document.createElement('li');
                li.textContent = task.text;
                if (task.completed) li.classList.add('completed');

                // Botón para marcar como completado
                const completedButton = document.createElement('button');
                completedButton.textContent = task.completed ? 'Desmarcar' : 'Completar';
                completedButton.addEventListener('click', () => {
                    task.completed = !task.completed; // Cambiar estado de completado
                    renderTasks(); // Volver a renderizar tareas
                });

                // Botón para marcar como personal
                const personalButton = document.createElement('button');
                personalButton.textContent = task.personal ? 'No personal' : 'Personal';
                personalButton.classList.add('personal'); // Aplicar clase personal
                personalButton.addEventListener('click', () => {
                    task.personal = !task.personal; // Cambiar estado de personal
                    renderTasks(); // Volver a renderizar tareas
                });

                // Botón para eliminar tarea
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.classList.add('delete'); // Aplicar clase delete
                deleteButton.addEventListener('click', () => {
                    tasks.splice(index, 1); // Eliminar tarea del array
                    renderTasks(); // Volver a renderizar tareas
                });

                li.appendChild(completedButton);
                li.appendChild(personalButton); // Agregar botón personal
                li.appendChild(deleteButton);
                taskList.appendChild(li);
            }
        });
        updateTaskCount(); // Actualizar el conteo de tareas
    }

    // Filtrar tareas
    filterTasks.addEventListener('change', () => {
        renderTasks(); // Volver a renderizar tareas al cambiar el filtro
    });

    // Actualizar el conteo de tareas
    function updateTaskCount() {
        taskCount.textContent = 'Total de Tareas: ' + tasks.length;
    }
});
