const Todo = function(obj) {
  let done = false;
  return {
    name: obj.name,
    priority: obj.priority,
    dueDate: obj.dueDate,
    description: obj.description,
    done
  };
};

export default Todo;
