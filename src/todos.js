const Todo = function(name, priority, dueDate, description) {
  let done = false;
  return { name, priority, dueDate, description, done };
};

export default Todo;
