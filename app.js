let todoList = [];
function addTodo(){
    const work=document.querySelector("#work").value;
    const description=document.querySelector("#description").value;
    if(!work||!description){
        alert('please fill out all fields');
        return;
    }
    const task={
        id: Date.now(),
        work: work,
        description: description,
        status: 'pending',
        addedOn: new Date().toLocaleString()
    };
    todoList.push(task);
    displayTasks();
    document.getElementById('work').value = '';
    document.getElementById('description').value = '';
}


function displayTasks() {
    const Tasks = document.getElementById('tasks');
    const completed = document.getElementById('completed');
    Tasks.innerHTML = '';
    completed.innerHTML = '';
   
    todoList.forEach(task => {
        const row = document.createElement('tr');
        const title = document.createElement('td');
        title.textContent = task.work;
        row.appendChild(title);

        const description = document.createElement('td');
        description.textContent = task.description;
        row.appendChild(description);
        if (task.status === 'pending') {
            const action = document.createElement('td');
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.onclick = () => markComplete(task.id);
            action.appendChild(completeButton);

            const edit = document.createElement('button');
            edit.textContent = 'Edit';
            edit.onclick = () => editTask(task.id);
            action.appendChild(edit);

            const deleteb = document.createElement('button');
            deleteb.textContent = 'Delete';
            deleteb.onclick = () => deleteTask(task.id);
            action.appendChild(deleteb);

            row.appendChild(action);
            Tasks.appendChild(row);
        }
        else {
            const completedOnCell = document.createElement('td');
            completedOnCell.textContent = task.completedOn;
            row.appendChild(completedOnCell);
            const action = document.createElement('td');
            const deleteB = document.createElement('button');
            deleteB.textContent = 'Delete';
            deleteB.onclick = () => deleteTask(task.id);
            action.appendChild(deleteB);

            row.appendChild(action);
            completed.appendChild(row);
        }
    });
}
function markComplete(id) {
    const task = todoList.find(task => task.id === id);
    task.status = 'completed';
    task.completedOn = new Date().toLocaleString();
    displayTasks();
}
function deleteTask(id) {
    todoList = todoList.filter(task => task.id !== id);
    displayTasks();
}
function editTask(id) {
    const task = todoList.find(task => task.id === id);
    const newTitle = prompt("Edit title:", task.work);
    const newDescription = prompt("Edit description:", task.description);

    if (newTitle && newDescription) {
        task.work = newTitle;
        task.description = newDescription;
        displayTasks();
    }
}
