window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM LOADED');

  const taskManager = new TaskManager('tasks-container', 'task-form', 'task-priority-filter');
  taskManager.add({ name: 'Buy Groceries', priority: 1 });
  taskManager.add({ name: 'Task 2', priority: 2 });
  taskManager.add({ name: 'Task 3', priority: 3 });
  taskManager.add({ name: 'Task 4', priority: 4 });
  taskManager.add({ name: 'Task 5', priority: 5 });
  taskManager.render();
  
  console.log(taskManager);
});