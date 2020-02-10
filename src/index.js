import Project from "./projects.js";
import Todo from "./todos.js";
import DOMmanipulation from "./DOM.js";

const projectList = document.getElementById("projectList");
let projects = [];

window.addEventListener("load", () => {
  console.log(Project);
  console.log(Todo);
  console.log(DOMmanipulation);
  console.log(Project("asdasd"));
  projects.push(Project("Proyecto1"));
  projects.push(Project("asdf"));
  console.log("dewd");
  DOMmanipulation.renderProjects(projectList, projects);
});
