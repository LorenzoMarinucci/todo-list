const eventHandler = (() => {
  const clickProject = (projects, callback) => {
    projects.forEach(project => project.addEventListener("click", callback));
    return { clickProject };
  };
  const addProject = (button, callback) => {
    button.addEventListener("click", e => callback(e));
  };
  return { clickProject, addProject };
})();

export default eventHandler;
