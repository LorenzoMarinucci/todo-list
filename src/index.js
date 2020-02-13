import Project from "./projects.js";
import Todo from "./todos.js";
import DOMmanipulation from "./DOM.js";

const projectList = document.getElementById("projectList"),
  todosContainer = document.getElementById("todosContainer");
let projects = [],
  selectedProject,
  selectedIndex,
  selectedTodoIndex,
  isTodoEdit = false,
  isEdit = false;

function autoSelectProject() {
  selectedProject = document.querySelector(".project");
  selectedProject.toggleAttribute("selected");
  selectedIndex = parseInt(selectedProject.getAttribute("data-index"));
  DOMmanipulation.renderTodosContainer(todosContainer, projects[selectedIndex]);
}

function selectProject(project) {
  if (!project.hasAttribute("selected")) {
    if (selectedProject) selectedProject.toggleAttribute("selected");
    selectedProject = project;
    selectedProject.toggleAttribute("selected");
    selectedIndex = selectedProject.getAttribute("data-index");
    while (todosContainer.firstChild) {
      todosContainer.firstChild.remove();
    }
    DOMmanipulation.renderTodosContainer(
      todosContainer,
      projects[selectedIndex]
    );
  }
}

window.addEventListener("load", () => {
  projects.push(Project({ name: "Default", description: "Just testing" }));
  projects.push(Project({ name: "Asdf", description: "Whatever" }));
  projects[0].todos.push(
    new Todo({
      name: "Asdd",
      priority: "High",
      dueDate: "2/2/20",
      description: "arre"
    })
  );
  projects[0].todos.push(
    new Todo({
      name: "Correr",
      priority: "Low",
      dueDate: "2/2/20",
      description: "Salir a correr"
    })
  );
  projects[1].todos.push(
    new Todo({
      name:
        "CorrerASÑDJASLDKJASLKDJASLKDJASLKDJASLKJDASLKJDAKLSDASJKLDJLASDJASLDJKASLKJD",
      priority: "Medium",
      dueDate: "2/2/20",
      description: "Salir a correr"
    })
  );
  projects[1].todos.push(
    new Todo({
      name: "Nada",
      priority: "None",
      dueDate: "2/2/20",
      description: "Salir a correr"
    })
  );
  projects.push(Project({ name: "", description: "" }));
  DOMmanipulation.renderProjects(projectList, projects);
  if (projects.length > 0) {
    autoSelectProject();
  }
});

function addProject() {
  if (isEdit) {
    let obj = DOMmanipulation.fetchProjectData();
    projects[selectedIndex].name = obj.name;
    projects[selectedIndex].description = obj.description;
    DOMmanipulation.renderProjects(projectList, projects);
    DOMmanipulation.renderTodosHeader(
      document.getElementById("todosHeader"),
      projects[selectedIndex].name,
      projects[selectedIndex].description
    );
    isEdit = false;
    selectedProject = Array.from(projectList.childNodes).find(
      child => child.getAttribute("data-index") == selectedIndex
    );
    selectedProject.toggleAttribute("selected");
  } else {
    projects.push(Project(DOMmanipulation.fetchProjectData()));
    DOMmanipulation.renderProjects(projectList, projects);
    selectProject(document.querySelectorAll(".project:last-child")[0]);
  }
  DOMmanipulation.deleteForm();
}

function deleteProject() {
  projects.splice(selectedIndex, 1);
  DOMmanipulation.renderProjects(projectList, projects);
  if (projects.length > 0) {
    autoSelectProject();
  } else {
    while (todosContainer.firstChild) {
      todosContainer.firstChild.remove();
    }
    let div = document.createElement("div");
    div.textContent = "You don't have any project. Add one!";
    div.style.textAlign = "center";
    div.style.margin = "0 auto";
    todosContainer.appendChild(div);
  }
}

function editProject() {
  isEdit = true;
  DOMmanipulation.showProjectForm();
  DOMmanipulation.setProjectForm(projects[selectedIndex]);
}

function addTodo() {
  let obj = DOMmanipulation.fetchTodoData();
  if (isTodoEdit) {
    projects[selectedIndex].todos[selectedTodoIndex] = Todo(
      DOMmanipulation.fetchTodoData(),
      projects[selectedIndex].todos[selectedTodoIndex].done
    );
    isTodoEdit = false;
  } else {
    projects[selectedIndex].todos.push(new Todo(obj));
  }
  DOMmanipulation.renderTodos(
    document.getElementById("todoList"),
    projects[selectedIndex]
  );
  DOMmanipulation.deleteForm();
}

function checkmarkTodo(todo) {
  projects[selectedIndex].todos[
    parseInt(todo.getAttribute("data-index"))
  ].done = !projects[selectedIndex].todos[
    parseInt(todo.getAttribute("data-index"))
  ].done;
}

function editTodo() {
  isTodoEdit = true;
  DOMmanipulation.showTodoForm();
  DOMmanipulation.setTodoForm(projects[selectedIndex].todos[selectedTodoIndex]);
}

function deleteTodo() {
  projects[selectedIndex].todos.splice(selectedTodoIndex, 1);
  DOMmanipulation.renderTodos(
    document.getElementById("todoList"),
    projects[selectedIndex]
  );
}

document.addEventListener("click", e => {
  if (e.target) {
    switch (e.target.id) {
      case "cancelSubmition":
        DOMmanipulation.deleteForm();
        isEdit = false;
        isTodoEdit = false;
        break;
      case "submitProject":
        addProject();
        break;
      case "deleteProject":
        deleteProject();
        break;
      case "editProject":
        editProject();
        break;
      case "submitTodo":
        addTodo();
        break;
      case "addProject":
        DOMmanipulation.showProjectForm();
        break;
      case "addTodo":
        DOMmanipulation.showTodoForm();
        break;
      default: {
        if (e.target.parentNode.classList.contains("project"))
          selectProject(e.target.parentNode);
        else if (e.target.classList.contains("checkmark"))
          checkmarkTodo(e.target.closest(".todo"));
        else if (e.target.classList.contains("edit")) {
          selectedTodoIndex = parseInt(
            e.target.closest(".todo").getAttribute("data-index")
          );
          editTodo();
        } else if (e.target.classList.contains("delete")) {
          selectedTodoIndex = parseInt(
            e.target.closest(".todo").getAttribute("data-index")
          );
          deleteTodo();
        }
      }
    }
  }
});
