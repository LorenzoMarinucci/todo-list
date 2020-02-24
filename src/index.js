import Project from "./projects.js";
import Todo from "./todos.js";
import DOMmanipulation from "./DOM.js";
import formatRelative from "../node_modules/date-fns/formatRelative";
import format from "../node_modules/date-fns/format";
import differenceInDays from "../node_modules/date-fns/differenceInDays";

const projectList = document.getElementById("projectList"),
  todosContainer = document.getElementById("todosContainer");
let projects,
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
  projects = localStorage.getItem("projects");
  if (projects) {
    projects = JSON.parse(projects);
  } else {
    projects = [];
    projects.push(
      Project({ name: "My Project", description: "Start adding your todos!" })
    );
    projects[0].todos.push(
      Todo({
        name: "Example",
        dueDate: "",
        description: "Just an example",
        priority: "Low"
      })
    );
  }
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
    DOMmanipulation.renderSingleTodo(
      projects[selectedIndex].todos[selectedTodoIndex],
      Array.from(document.querySelectorAll(".todo")).find(
        element => element.getAttribute("data-index") == selectedTodoIndex
      )
    );
    isTodoEdit = false;
  } else {
    projects[selectedIndex].todos.push(new Todo(obj));
    DOMmanipulation.renderTodos(
      document.getElementById("todoList"),
      projects[selectedIndex]
    );
  }
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

function todoExpansion() {
  projects[selectedIndex].todos[selectedTodoIndex].expand = !projects[
    selectedIndex
  ].todos[selectedTodoIndex].expand;
  DOMmanipulation.renderSingleTodo(
    projects[selectedIndex].todos[selectedTodoIndex],
    Array.from(document.querySelectorAll(".todo")).find(
      element => element.getAttribute("data-index") == selectedTodoIndex
    )
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
        } else if (e.target.nodeName == "I") {
          selectedTodoIndex = parseInt(
            e.target.closest(".todo").getAttribute("data-index")
          );
          todoExpansion();
        }
      }
    }
    localStorage.setItem("projects", JSON.stringify(projects));
  }
});
