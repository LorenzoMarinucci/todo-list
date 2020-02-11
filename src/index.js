import Project from "./projects.js";
import Todo from "./todos.js";
import DOMmanipulation from "./DOM.js";
import eventHandler from "./eventHandler.js";

const projectList = document.getElementById("projectList"),
  todosContainer = document.getElementById("todosContainer"),
  addProjectBtn = document.getElementById("addProject");
let projects = [],
  selectedProject,
  selectedIndex;

function autoSelectProject() {
  selectedProject = document.querySelector(".project");
  selectedProject.toggleAttribute("selected");
}

function selectProject(e) {
  if (!e.target.parentNode.hasAttribute("selected")) {
    selectedProject.toggleAttribute("selected");
    selectedProject = e.target.parentNode;
    selectedProject.toggleAttribute("selected");
    selectedIndex = selectedProject.getAttribute("data-index");
    while (todosContainer.firstChild) {
      todosContainer.firstChild.remove();
    }
    console.log(todosContainer);
    DOMmanipulation.renderTodosContainer(
      todosContainer,
      projects[selectedIndex]
    );
  }
}

window.addEventListener("load", () => {
  projects.push(Project("Default"));
  projects.push(Project("asdf"));
  DOMmanipulation.renderProjects(projectList, projects);
  eventHandler.clickProject(
    document.querySelectorAll(".project"),
    selectProject
  );
  if (projects.length > 0) {
    autoSelectProject();
    selectedIndex = parseInt(selectedProject.getAttribute("data-index"));
    DOMmanipulation.renderTodosContainer(
      todosContainer,
      projects[selectedIndex]
    );
  }
});
