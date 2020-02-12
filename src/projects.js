const Project = function(obj) {
  let todos = [];
  if (!obj.name) obj.name = "My Project";
  return { todos, name: obj.name, description: obj.description };
};

export default Project;
