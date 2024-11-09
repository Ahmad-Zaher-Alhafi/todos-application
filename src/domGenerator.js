const projects = document.querySelector(".projects");

const todoListPrefab = document.querySelector(".todoList");
todoListPrefab.remove();

const projectPrefab = document.querySelector(".project");
projectPrefab.remove();

const textConfigurationPrefab = document.querySelector(".projectConfiguration");
textConfigurationPrefab.remove();

const categoryPrefab = document.querySelector(".category");
categoryPrefab.remove();

const todoListDisplay = document.querySelector(".todoListDisplay");
todoListDisplay.remove();

const displayArea = document.querySelector(".displayArea");

const projectElements = [];
const todoListElements = [];
const categoryElements = [];

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

    const editProjectButton = project.querySelector(".editProjectButton");
    editProjectButton.addEventListener("click", () => {
        const event = new CustomEvent("editProjectClicked", {
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

function removeProjectElement(id) {
    const projectToRemove = getProject(id);
    projectElements.splice(projectElements.indexOf(projectToRemove), 1);
    projectToRemove.remove();
}

function setProjectTitle(id, title) {
    const project = getProject(id);
    project.querySelector(".projectTitle").textContent = title;
}

function setTodoListTitle(id, title) {
    const project = getTodoList(id);
    project.querySelector(".todoListTitle").textContent = title;
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
    deleteTodoListButton.addEventListener("click", (event) => {
        const customEvent = new CustomEvent("deleteTodoListClicked", {
            detail: { projectID, todoListID }
        });
        event.stopPropagation();
        document.dispatchEvent(customEvent);
    });

    const editTodoListButton = todoList.querySelector(".editTodoListButton");
    editTodoListButton.addEventListener("click", (event) => {
        const customEvent = new CustomEvent("editTodoListClicked", {
            detail: { projectID, todoListID }
        });
        event.stopPropagation();
        document.dispatchEvent(customEvent);
    });

    todoList.addEventListener("click", () => {
        const customEvent = new CustomEvent("todoListClicked", {
            detail: { projectID, todoListID }
        });
        document.dispatchEvent(customEvent);
    });
}


function getTodoList(todoListID) {
    return todoListElements.find(todoList => todoList.getAttribute("todoListID") === todoListID.toString());
}

function removeTodoListElement(id) {
    const todoListToRemove = getTodoList(id);
    todoListElements.splice(todoListElements.indexOf(todoListToRemove), 1);
    todoListToRemove.remove();
}

function displayTodoList(id, projectID, title, descreption, categories) {
    displayArea.appendChild(todoListDisplay);
    todoListDisplay.querySelector(".todoListTitle").textContent = title;
    todoListDisplay.querySelector(".todoListDesc").textContent = descreption;

    const todoListID = id;
    projectID = projectID;

    const addCategoryButton = todoListDisplay.querySelector(".addCategoryButton");
    addCategoryButton.addEventListener("click", () => {
        const customEvent = new CustomEvent("addCategoryClicked", {
            detail: { projectID, todoListID }
        });
        document.dispatchEvent(customEvent);
    });
}

function addCateogryElement(id, title) {
    const category = categoryPrefab.cloneNode(true);
    category.setAttribute("categoryID", id);
    const categoryTitle = category.querySelector(".categoryTitle");
    categoryTitle.textContent = title;
    const todoCategories = todoListDisplay.querySelector(".todoCategories");
    todoCategories.appendChild(category);
}

const projectConfigurationElemnt = createTextConfigurationElement("Project title:");
const editProjectConfigurationElemnt = createTextConfigurationElement("Project new title:");
const todoListConfigurationElemnt = createTextConfigurationElement("TodoList title:");
const editTodoListConfigurationElemnt = createTextConfigurationElement("TodoList new title:");
const addCategoryConfigurationElemnt = createTextConfigurationElement("Category title:");

export {
    createProjectElement, removeProjectElement, setProjectTitle, getProject, createTodoListElement, removeTodoListElement, getTodoList, setTodoListTitle, displayTodoList, addCateogryElement,
    projectConfigurationElemnt, editProjectConfigurationElemnt, todoListConfigurationElemnt, editTodoListConfigurationElemnt, addCategoryConfigurationElemnt, todoListDisplay,
};