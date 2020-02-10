const DOMmanipulation = (function() {
  const renderProjects = function(container, projects) {
    projects.forEach(project => {
      let h2 = document.createElement("h2");
      h2.textContent = `${project.name}`;
      let projectDiv = document.createElement("div");
      projectDiv.classList.add("project");
      projectDiv.appendChild(h2);
      container.appendChild(projectDiv);
    });
  };
  const renderTodosContainer = function(container, project) {
    let header = document.createElement("div");
    header.id = "todosHeader";
    header.appendChild(
      document.createElement(h2).textContent(`${project.name}`)
    );
    let projectDescription = document.createElement("p");
    projectDescription.id = "projectDescription";
    header.appendChild(projectDescription);
    let todoList = document.createElement("div");
    todoList = renderTodos(todoList, project);
    let projectButtons = document.createElement("div");
    let editProject = document
        .createElement("button")
        .textContent("Edit Project"),
      deleteProject = document
        .createElement("button")
        .textContent("Delete Project"),
      addTodo = document.createElement("button").textContent("Add Todo");
    editProject.id = "editProject";
    deleteProject.id = "deleteProject";
    addTodo.id = "addTodo";
    projectButtons.appendChild(editProject, deleteProject, addTodo);
    container.appendChild(
      header,
      document.createElement("hr"),
      todoList,
      document.createElement("hr"),
      projectButtons
    );
  };
  const renderTodos = function(container, project) {
    project.todos.forEach(todo => {
      let div = document.createElement("div").classList.add("todo");
      let todoHeader = document
        .createElement("div")
        .classList.add("todoHeader");
      let h3 = document.createElement("h3");
      let color;
      switch (todo.priority) {
        case "High":
          color = "red";
          break;
        case "Low":
          color = "green";
          break;
        case "Medium":
          color = "yellow";
          break;
        default:
          color = "grey";
      }
      h3.innerHTML = `<span class="dot ${color}"></span>${todo.name}`;
      todoHeader.appendChild(h3);
      let buttons = document.createElement("div").classList.add("buttons");
      let checked = todo.done ? ' checked="checked"' : "";
      buttons.innerHTML = `<label class="container"><input type="checkbox"${checked} /><span class="checkmark"></span></label><div class="todoOptions"><img class="edit" src="images/edit.png" /><img class="delete" src="images/delete.png" /></div></div><i class="down" class="showTodo"></i>`;
      todoHeader.appendChild(h3, buttons);
      let due = document.createElement("h4");
      due.textContent = `Due: ${todo.due}`;
      let priority = document.createElement("h4");
      priority.textContent = `Priority: ${todo.priority}`;
      let p = document.createElement("p");
      p.classList.add("description");
      p.textContent = todo.description;
      div.appendChild(todoHeader, due, priority, p);
      return container.appendChild(div);
    });
  };
  return { renderProjects, renderTodosContainer, renderTodos };
})();

export default DOMmanipulation;
