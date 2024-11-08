const projects = document.querySelector(".projects");

const todoListPrefab = document.querySelector(".todoList");
todoListPrefab.remove();

const projectPrefab = document.querySelector(".project");
projectPrefab.remove();

const textConfigurationPrefab = document.querySelector(".projectConfiguration");
textConfigurationPrefab.remove();

const projectElements = [];
const todoListElements = [];

function createTextConfigurationElement(labelText) {
    const textConfiguration = textConfigurationPrefab.cloneNode(true);
    const configurationLabel = textConfiguration.querySelector(".projectTitle");
    configurationLabel.textContent = labelText;
    return textConfiguration;
}

function createProjectElement(id, title) {
    const project = projectPrefab.cloneNode(true);
    projectElements.push(project);
    const projectID = id;
    project.setAttribute("projectID", id);
    projects.appendChild(project);
    const projectTitle = project.querySelector(".projectTitle");
    projectTitle.textContent = title;

    const deleteProjectButton = project.querySelector(".deleteProjectButton");
    deleteProjectButton.addEventListener("click", () => {
        const event = new CustomEvent("deleteProjectClicked", {
            detail: { projectID }
        });
        document.dispatchEvent(event);
    });

    const addTodoListButton = project.querySelector(".addTodoListButton");
    addTodoListButton.addEventListener("click", () => {
        const event = new CustomEvent("addTodoListClicked", {
            detail: { projectID }
        });
        document.dispatchEvent(event);
    });
}

function removeProjectElemnt(id) {
    const projectToRemove = getProject(id);
    projectToRemove.remove();
}

function getProject(projectID) {
    return projectElements.find(project => project.getAttribute("projectID") === projectID.toString());
}

function createTodoListElement(id, projectID, title) {
    const todoList = todoListPrefab.cloneNode(true);
    todoListElements.push(todoList);
    todoList.setAttribute("todoListID", id);
    const todoListID = id;
    projectID = projectID;
    const project = getProject(projectID);
    project.appendChild(todoList);
    const todoListsContent = project.querySelector(".todoListsContent");
    todoListsContent.appendChild(todoList);
    const todoListTitle = todoList.querySelector(".todoListTitle");
    todoListTitle.textContent = title;

    const deleteTodoListButton = todoList.querySelector(".deleteTodoListButton");
    deleteTodoListButton.addEventListener("click", () => {
        const event = new CustomEvent("deleteTodoListClicked", {
            detail: { projectID, todoListID }
        });
        document.dispatchEvent(event);
    });
}


function getTodoList(todoListID) {
    return todoListElements.find(todoList => todoList.getAttribute("todoListID") === todoListID.toString());
}

function removeTodoListElement(id) {
    const todoListToRemove = getTodoList(id);
    todoListElements.splice(todoListElements.indexOf(todoListToRemove), 1);
    todoListToRemove.remove();
    console.log(todoListElements);
}


const projectConfigurationElemnt = createTextConfigurationElement("Project title:");
const todoListConfigurationElemnt = createTextConfigurationElement("TodoList title:");

export { createProjectElement, removeProjectElemnt, createTodoListElement, getProject, removeTodoListElement, projectConfigurationElemnt, todoListConfigurationElemnt };