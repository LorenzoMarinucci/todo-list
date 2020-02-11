const DOMmanipulation = (function() {
  const renderProjects = function(container, projects) {
    projects.forEach((project, index) => {
      let h2 = document.createElement("h2");
      h2.textContent = `${project.name}`;
      let projectDiv = document.createElement("div");
      projectDiv.classList.add("project");
      projectDiv.setAttribute("data-index", index);
      projectDiv.appendChild(h2);
      container.appendChild(projectDiv);
    });
  };
  const renderTodosContainer = function(container, project) {
    let header = document.createElement("div");
    header.id = "todosHeader";
    let h2 = document.createElement("h2");
    h2.textContent = `${project.name}`;
    header.appendChild(h2);
    let projectDescription = document.createElement("p");
    projectDescription.id = "projectDescription";
    header.appendChild(projectDescription);
    let todoList = document.createElement("div");
    todoList = renderTodos(todoList, project);
    todoList.id = "todoList";
    let projectButtons = document.createElement("div");
    let editProject = document.createElement("button");
    editProject.textContent = "Edit Project";
    let deleteProject = document.createElement("button");
    deleteProject.textContent = "Delete Project";
    let addTodo = document.createElement("button");
    addTodo.textContent = "Add Todo";
    editProject.id = "editProject";
    deleteProject.id = "deleteProject";
    addTodo.id = "addTodo";
    projectButtons.appendChild(editProject);
    projectButtons.appendChild(deleteProject);
    projectButtons.appendChild(addTodo);
    projectButtons.id = "projectButtons";
    container.appendChild(header);
    container.appendChild(document.createElement("hr"));
    container.appendChild(todoList);
    container.appendChild(document.createElement("hr"));
    container.appendChild(projectButtons);
  };
  const renderTodos = function(container, project) {
    if (project.todos.length > 0) {
      project.todos.forEach((todo, index) => {
        let div = document.createElement("div").classList.add("todo");
        div.setAttribute("data-index", index);
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
    }
    return container;
  };
  return { renderProjects, renderTodosContainer, renderTodos };
})();

export default DOMmanipulation;
