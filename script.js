document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const filterTasks = document.getElementById('filterTasks');

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const li = document.createElement('li');
            li.textContent = taskText;
            li.classList.add('task'); // Añadir clase para el estilo

            const completedButton = document.createElement('button');
            completedButton.textContent = 'Completar';
            completedButton.addEventListener('click', () => {
                li.classList.toggle('completed'); // Marcar tarea como completada
                completedButton.textContent = li.classList.contains('completed') ? 'Desmarcar' : 'Completar';
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => {
                taskList.removeChild(li);
            });

            li.appendChild(completedButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
            taskInput.value = ''; // Limpiar el campo de entrada
        } else {
            alert('Por favor, ingrese una tarea.');
        }
    });

    // Filtrar tareas
    filterTasks.addEventListener('change', () => {
        const filterValue = filterTasks.value;
        const tasks = document.querySelectorAll('.task');

        tasks.forEach(task => {
            switch (filterValue) {
                case 'completed':
                    task.style.display = task.classList.contains('completed') ? '' : 'none';
                    break;
                case 'pending':
                    task.style.display = !task.classList.contains('completed') ? '' : 'none';
                    break;
                default:
                    task.style.display = '';
                    break;
            }
        });
    });
});
