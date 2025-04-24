class TaskManager {

  constructor(taskContainerId, taskFormId) {
    this.taskContainerId =  taskContainerId;
    this.taskFormId = taskFormId;
    this.tasks = [];

    document.getElementById(this.taskFormId)
      .addEventListener('submit', (event) => this.onTaskFormSubmit(event));
  }

  // tasks: { name: 'Task name', priority: '1' }
  add(task) {
    this.tasks.push({
      id: self.crypto.randomUUID(),
      name: task.name.trim(),
      priority: parseInt(task.priority),
      isCompleted: false
    });
  }

  complete(id) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.isCompleted = true;
    }
  }

  delete(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  onTaskFormSubmit(event) {
    event.preventDefault();
    const taskForm = event.target;
    const task = Object.fromEntries(new FormData(taskForm).entries());
    if (task.name.trim()) {
      this.add(task);
      this.render();
      taskForm.reset();
    }
  }

  buildTaskHTML(task) {
    const taskNode = document.createElement('li');
    taskNode.setAttribute('id', task.id);
    taskNode.classList.add('list-group-item', 'd-flex', 'gap-2', 'align-items-baseline');
    if (task.isCompleted) {
      taskNode.classList.add('bg-light')
    }

    const taskPriorityImg = document.createElement('img');
    taskPriorityImg.src = `/assets/img/icons/priority/${getPriorityIconFromNumber(task.priority)}.svg`;
    taskPriorityImg.classList.add('priority-icon')
    taskPriorityImg.alt = `P${task.priority}`;
    taskNode.appendChild(taskPriorityImg);

    const taskNameNode = document.createElement('div');
    taskNameNode.classList.add('me-auto');
    if (task.isCompleted) {
      taskNameNode.classList.add('text-decoration-line-through')
    }
    taskNameNode.appendChild(document.createTextNode(task.name));
    taskNode.appendChild(taskNameNode);

    const taskActionsNode = document.createElement('div');
    taskActionsNode.classList.add('d-flex', 'gap-2');
    taskNode.appendChild(taskActionsNode);

    const completeTaskNode = document.createElement('i');
    completeTaskNode.classList.add('fa', 'fa-check', task.isCompleted ? 'text-success' : 'text-secondary');
    if (!task.isCompleted) {
      completeTaskNode.setAttribute('role', 'button');
    }
    taskActionsNode.appendChild(completeTaskNode);
    completeTaskNode.addEventListener('click', () => {
      this.complete(task.id);
      this.render();
    });

    if (!task.isCompleted) {
      const deleteTaskNode = document.createElement('i');
      deleteTaskNode.classList.add('fa', 'fa-trash-o', 'text-danger');
      deleteTaskNode.setAttribute('role', 'button');
      taskActionsNode.appendChild(deleteTaskNode);
      deleteTaskNode.addEventListener('click', () => {
        this.delete(task.id);
        this.render();
      })
    }

    return taskNode;
  }

  render() {
    const tasksContainer = document.getElementById(this.taskContainerId);
    tasksContainer.innerHTML = '';

    for (const task of this.tasks) {
      tasksContainer.appendChild(this.buildTaskHTML(task));
    }
  }

}