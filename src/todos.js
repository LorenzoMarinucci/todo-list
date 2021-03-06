const Todo = function(obj, done = false) {
  if (!obj.name) obj.name = "Todo";
  return {
    name: obj.name,
    priority: obj.priority,
    dueDate: obj.dueDate,
    description: obj.description,
    done
  };
};

export default Todo;
