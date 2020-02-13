const DOMmanipulation = (function() {
  const renderProjects = function(container, projects) {
    while (container.firstChild) {
      container.firstChild.remove();
    }
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
    while (container.firstChild) container.firstChild.remove();
    let header = document.createElement("div");
    header.id = "todosHeader";
    let h2 = document.createElement("h2");
    h2.textContent = `${project.name}`;
    header.appendChild(h2);
    let projectDescription = document.createElement("p");
    projectDescription.id = "projectDescription";
    projectDescription.textContent = project.description;
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
        let div = document.createElement("div");
        div.classList.add("todo");
        div.setAttribute("data-index", index);
        let todoHeader = document.createElement("div");
        todoHeader.classList.add("todoHeader");
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
        h3.innerHTML = `<span class="dot ${color}"></span> ${todo.name}`;
        todoHeader.appendChild(h3);
        let buttons = document.createElement("div");
        buttons.classList.add("buttons");
        let checked = todo.done ? ' checked="checked"' : "";
        buttons.innerHTML = `<label class="container"><input type="checkbox"${checked} /><span class="checkmark"></span></label><div class="todoOptions"><img class="edit" src="images/edit.png" /><img class="delete" src="images/delete.png" /></div></div><i class="down" class="showTodo"></i>`;
        todoHeader.appendChild(h3);
        todoHeader.appendChild(buttons);
        let due = document.createElement("h4");
        due.textContent = `Due: ${todo.dueDate}`;
        let priority = document.createElement("h4");
        priority.textContent = `Priority: ${todo.priority}`;
        let p = document.createElement("p");
        p.classList.add("description");
        p.textContent = todo.description;
        div.appendChild(todoHeader);
        div.appendChild(due);
        div.appendChild(priority);
        div.appendChild(p);
        return container.appendChild(div);
      });
    }
    return container;
  };
  const showProjectForm = () => {
    let body = document.querySelector("body");
    let div = document.createElement("div");
    div.id = "formBackground";
    div.innerHTML =
      '<div id="projectForm">\
        <form action="">\
          <label for="name">Project name</label>\
          <input type="text" id="name" />\
          <label for="description">Project description</label>\
          <textarea id="description"></textarea>\
        </form>\
        <div id="projectFormButtons">\
          <button id="cancelSubmition">Cancel</button>\
          <button id="submitProject">Submit</button>\
        </div>\
      </div>';
    body.appendChild(div);
  };
  const deleteForm = () => {
    let container = document.getElementById("formBackground");
    container.parentElement.removeChild(container);
  };
  const fetchProjectData = () => {
    const form = document.querySelector("form");
    return {
      name: form.querySelector("#name").value,
      description: form.querySelector("#description").value
    };
  };
  const renderTodosHeader = (header, name, description) => {
    header.querySelector("h2").textContent = name;
    header.querySelector("p").textContent = description;
  };
  const setProjectForm = (name, description) => {
    document.getElementById("name").value = name;
    document.getElementById("description").value = description;
  };
  return {
    renderProjects,
    renderTodosContainer,
    renderTodos,
    showProjectForm,
    deleteForm,
    fetchProjectData,
    renderTodosHeader,
    setProjectForm
  };
})();

export default DOMmanipulation;
