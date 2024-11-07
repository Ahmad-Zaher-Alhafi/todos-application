const projects = document.querySelector(".projects");

const projectPrefab = document.querySelector(".project");
projectPrefab.remove();

const textConfigurationPrefab = document.querySelector(".projectConfiguration");
textConfigurationPrefab.remove();

const projectElements = [];

function createTextConfigurationElement(labelText) {
    const textConfiguration = textConfigurationPrefab.cloneNode(true);
    const configurationLabel = textConfiguration.querySelector(".projectTitle");
    configurationLabel.textContent = labelText;
    return textConfiguration;
}

function createProjectElement(id, title) {
    const project = projectPrefab.cloneNode(true);
    projectElements.push(project);
    project.setAttribute("projectID", id);
    projects.appendChild(project);
    const projectTitle = project.querySelector(".projectTitle");
    projectTitle.textContent = title;

    const deleteProjectButton = project.querySelector(".deleteProjectButton");
    deleteProjectButton.addEventListener("click", () => {
        const event = new CustomEvent("deleteProjectClicked", { title });
        document.dispatchEvent(event);
    });
}

function removeProjectElemnt(id) {
    const projectToRemove = projectElements.find(project => project.projectID === id);
    projectToRemove.remove();
}

export { createProjectElement, removeProjectElemnt, createTextConfigurationElement };