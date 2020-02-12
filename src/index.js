import Project from "./projects.js";
import Todo from "./todos.js";
import DOMmanipulation from "./DOM.js";

const projectList = document.getElementById("projectList"),
  todosContainer = document.getElementById("todosContainer"),
  addProjectBtn = document.getElementById("addProject");
let projects = [],
  selectedProject,
  selectedIndex;

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

addProjectBtn.addEventListener("click", () => {
  DOMmanipulation.showProjectForm();
});

function addProject() {
  projects.push(Project(DOMmanipulation.fetchProjectData()));
  DOMmanipulation.renderProjects(projectList, projects);
  selectProject(document.querySelectorAll(".project:last-child")[0]);
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

document.addEventListener("click", e => {
  if (e.target) {
    switch (e.target.id) {
      case "cancelSubmition":
        DOMmanipulation.deleteForm();
        break;
      case "submitProject":
        addProject();
        break;
      case "deleteProject":
        deleteProject();
        break;
      default: {
        if (e.target.parentNode.classList.contains("project"))
          selectProject(e.target.parentNode);
      }
    }
  }
});
