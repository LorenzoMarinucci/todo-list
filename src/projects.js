const Project = function(obj) {
  if (!obj.todos) obj.todos = [];
  if (!obj.name) obj.name = "My Project";
  return { todos: obj.todos, name: obj.name, description: obj.description };
};

export default Project;
