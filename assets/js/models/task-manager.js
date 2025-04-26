class TaskManager {

  constructor(taskContainerId, taskFormId, taskPriorityFilterId) {
    this.taskContainerId =  taskContainerId;
    this.taskFormId = taskFormId;
    this.taskPriorityFilterId = taskPriorityFilterId;
    this.tasks = [];
    this.filterByPriority = undefined;

    document.getElementById(this.taskFormId)
      .addEventListener('submit', (event) => this.onTaskFormSubmit(event));
    new AirDatepicker(`#${this.taskFormId} [name="dueDate"]`, {
      minDate: new Date(),
      selectedDates: [new Date()],
      position: 'left top',
      locale: {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'yyyy-MM-dd',
        timeFormat: 'hh:ii aa',
        firstDay: 1
      }
    });

    document.querySelectorAll(`#${this.taskPriorityFilterId} button`)
      .forEach((btn) => {
        btn.addEventListener('click', (event) => {
          const priority = event.currentTarget.dataset.priority;
          if (priority === 'all') {
            this.filterByPriority = undefined;
          } else {
            this.filterByPriority = parseInt(priority);
          }
          this.render();
        });
      });
  }

  // tasks: { name: 'Task name', priority: '1', dueDate?: '2025-04-26' }
  add(task) {
    this.tasks.push({
      id: self.crypto.randomUUID(),
      name: task.name.trim(),
      priority: parseInt(task.priority),
      isCompleted: false,
      dueDate: task.dueDate ? new Date(task.dueDate) : today()
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

  // <span class="badge text-bg-light fw-lighter text-danger">2025-04-26</span>

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

    const dueDateNode = document.createElement('span');
    dueDateNode.classList.add('badge', 'text-bg-light', 'fw-light');
    dueDateNode.appendChild(document.createTextNode(task.dueDate.toISODateString()));
    taskNode.appendChild(dueDateNode);

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
      if (!this.filterByPriority || this.filterByPriority === task.priority) {
        tasksContainer.appendChild(this.buildTaskHTML(task));
      }
    }
  }

}