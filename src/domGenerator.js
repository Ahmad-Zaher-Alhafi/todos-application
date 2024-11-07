const projects = document.querySelector(".projects");

const projectPrefab = document.querySelector(".project");
projectPrefab.remove();


function createProjectElement(title) {
    const project = projectPrefab.cloneNode(true);
    projects.appendChild(project);
    const projectTitle = project.querySelector(".projectTitle");
    projectTitle.textContent = title;
}

export { createProjectElement };