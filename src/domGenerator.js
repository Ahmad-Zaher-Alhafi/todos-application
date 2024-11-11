import { compareAsc, format } from "date-fns";

const projects = document.querySelector(".projects");

const todoListPrefab = document.querySelector(".todoList");
todoListPrefab.remove();

const projectPrefab = document.querySelector(".project");
projectPrefab.remove();

const textConfigurationPrefab = document.querySelector(".projectConfiguration");
textConfigurationPrefab.remove();

const todoConfigurationPrefab = document.querySelector(".todoConfiguration");
todoConfigurationPrefab.remove();

const todoPrefab = document.querySelector(".todo");
todoPrefab.remove();

const categoryPrefab = document.querySelector(".category");
categoryPrefab.remove();

const addCategoryHeader = document.querySelector(".addCategoryHeader");


const descAreaPrefab = document.querySelector(".descArea");
let todoListDescArea;
let todoListDesc;
let todoListAreaConfiguration;

const todoListDisplayHeader = document.querySelector(".todoListDisplayHeader");

const areaConfigurationPrefab = todoListDisplayHeader.querySelector(".areaConfiguration");
areaConfigurationPrefab.remove();

const todoListDisplay = document.querySelector(".todoListDisplay");
todoListDisplay.remove();

const emptyContentMessage = document.querySelector(".emptyContentMessage");

const todoCategories = todoListDisplay.querySelector(".todoCategories");

const displayArea = document.querySelector(".displayArea");

const projectElements = [];
const todoListElements = [];
const categoryElements = [];
const todoElements = [];

function createTextConfigurationElement(labelText) {
    const textConfiguration = textConfigurationPrefab.cloneNode(true);
    const configurationLabel = textConfiguration.querySelector(".configurationTitle");
    configurationLabel.textContent = labelText;
    return textConfiguration;
}

function createTodoConfigurationElement() {
    const todoConfiguration = todoConfigurationPrefab.cloneNode(true);
    todoConfiguration.cloneNode(true);

    // Set date input defulat value to today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    todoConfiguration.querySelector(".configurationDueDateInput").value = formattedDate;
    return todoConfiguration;
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
    const todoList = getTodoList(id);
    todoList.querySelector(".todoListTitle").textContent = title;
}

function setTodoListDesc(desc) {
    todoListDesc.textContent = desc;
}

function setCategoryTitle(id, title) {
    const category = getCategory(id);
    category.querySelector(".categoryTitle").textContent = title;
}

function setTodoInfo(id, title, description, dueDate, priority) {
    const todo = getTodo(id);

    const todoTitle = todo.querySelector(".todoTitle");
    todoTitle.textContent = title;
    const todoDesc = todo.querySelector(".todoDesc");
    todoDesc.textContent = description;
    const todoDueDate = todo.querySelector(".todoDueDate");
    todoDueDate.textContent = dueDate;
    const todoPriority = todo.querySelector(".todoPriority");
    todoPriority.textContent = priority;
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

function removeCategoryElement(id) {
    const categoryToRemove = getCategory(id);
    categoryElements.splice(categoryElements.indexOf(categoryToRemove), 1);
    categoryToRemove.remove();
}

function removeTodoElement(id) {
    const todoToRemove = getTodo(id);
    todoElements.splice(todoElements.indexOf(todoToRemove), 1);
    todoToRemove.remove();
}

function showTodoListDescriptionArea(description) {
    todoListAreaConfiguration?.remove();
    todoListDescArea = createDescriptionArea(todoListDisplayHeader);
    todoListDesc = todoListDescArea.querySelector(".todoListDesc");
    setTodoListDesc(description);

    let editAreaButton = todoListDescArea.querySelector(".editAreaButton");
    todoListDescArea.replaceChild(editAreaButton.cloneNode(true), editAreaButton);
    editAreaButton = todoListDescArea.querySelector(".editAreaButton");
    editAreaButton.addEventListener("click", () => {
        const customEvent = new CustomEvent("editTodoListDescClicked");
        document.dispatchEvent(customEvent);
    });
}

function displayTodoList(title, description, catrgories) {
    emptyContentMessage.remove();

    displayArea.appendChild(todoListDisplay);

    showTodoListDescriptionArea();

    todoListDisplay.querySelector(".todoListTitle").textContent = title;
    todoListDesc.textContent = description;

    showCategoriesInDisplayPage(catrgories);
    showTodosInAllCategories(catrgories);

    let addCategoryButton = addCategoryHeader.querySelector(".addCategoryButton");
    addCategoryHeader.replaceChild(addCategoryButton.cloneNode(true), addCategoryButton);
    addCategoryButton = addCategoryHeader.querySelector(".addCategoryButton");
    addCategoryButton.addEventListener("click", () => {
        const customEvent = new CustomEvent("addCategoryClicked");
        document.dispatchEvent(customEvent);
    });
}

function showTodoListAreaConfiguration() {
    todoListAreaConfiguration = createAreaConfiguration(todoListDisplayHeader);
    const configurationAreaInput = todoListAreaConfiguration.querySelector(".areaConfigurationInput");
    configurationAreaInput.value = todoListDesc.textContent;
    todoListDescArea.remove();

    let areaConfigurationButton = todoListAreaConfiguration.querySelector(".areaConfigurationButton");
    todoListAreaConfiguration.replaceChild(areaConfigurationButton.cloneNode(true), areaConfigurationButton);
    areaConfigurationButton = todoListAreaConfiguration.querySelector(".areaConfigurationButton");
    areaConfigurationButton.addEventListener("click", () => {
        const customEvent = new CustomEvent("editTodoListDescConfirmed", {
            detail: { newTodoListDesc: configurationAreaInput.value }
        });
        document.dispatchEvent(customEvent);
    });
}

function createDescriptionArea(parentelement) {
    let descArea = parentelement.querySelector(".descArea");

    if (descArea == undefined) {
        descArea = descAreaPrefab.cloneNode(true);
    }

    parentelement.appendChild(descArea);

    return descArea;
}

function createAreaConfiguration(parentElement) {
    let areaConfiguration = parentElement.querySelector(".areaConfigurationInput");

    if (areaConfiguration == undefined) {
        areaConfiguration = areaConfigurationPrefab.cloneNode(true);
    }

    parentElement.appendChild(areaConfiguration);

    return areaConfiguration;
}

function showCategoriesInDisplayPage(catrgories) {
    hideAllCategories();

    catrgories.forEach(category => {
        createCategoryElement(category.id, category.title);
    });
}

function hideAllCategories() {
    categoryElements.forEach(categoryElement => {
        categoryElement.remove();
    });

    categoryElements.length = 0;
}

function showTodosInAllCategories(catrgories) {
    hideAllTodos();
    catrgories.forEach(category => {
        showTodosInCategory(category);
    });
}

function showTodosInCategory(category) {
    category.getAllTodos().forEach(todo => {
        createTodoElement(todo.id, category.id, todo.title, todo.description, todo.dueDate, todo.priority);
    });
}

function hideAllTodos() {
    todoElements.forEach(todoElement => {
        todoElement.remove();
    });

    todoElements.length = 0;
}

function createCategoryElement(id, title) {
    console.log(title);
    const category = categoryPrefab.cloneNode(true);
    category.setAttribute("categoryID", id);
    categoryElements.push(category);
    const categoryTitle = category.querySelector(".categoryTitle");
    categoryTitle.textContent = title;
    todoCategories.appendChild(category);

    const categoryID = id;

    const addTodoButton = category.querySelector(".addTodoButton");
    addTodoButton.addEventListener("click", () => {
        const event = new CustomEvent("addTodoClicked", {
            detail: { categoryID }
        });
        document.dispatchEvent(event);
    });

    const editCategoryButton = category.querySelector(".editCategoryButton");
    editCategoryButton.addEventListener("click", () => {
        const event = new CustomEvent("editCategoryClicked", {
            detail: { categoryID }
        });
        document.dispatchEvent(event);
    });

    const deleteCategoryButton = category.querySelector(".deleteCategoryButton");
    deleteCategoryButton.addEventListener("click", () => {
        const event = new CustomEvent("deleteCategoryClicked", {
            detail: { categoryID }
        });
        document.dispatchEvent(event);
    });
}

function getCategory(id) {
    return categoryElements.find(category => category.getAttribute("categoryID") === id.toString());
}

function createTodoElement(id, categoryID, title, description, dueDate, priority) {
    const todo = todoPrefab.cloneNode(true);
    todo.setAttribute("todoID", id);
    todoElements.push(todo);

    setTodoInfo(id, title, description, dueDate, priority);

    const categoryElement = getCategory(categoryID)
    const categoryTodos = categoryElement.querySelector(".categoryTodos");
    categoryTodos.appendChild(todo);

    const todoID = id;
    categoryID = categoryID;

    const editTodoButton = todo.querySelector(".editTodoButton");
    editTodoButton.addEventListener("click", () => {
        const event = new CustomEvent("editTodoClicked", {
            detail: { todoID, categoryID }
        });
        document.dispatchEvent(event);
    });

    const deleteTodoButton = todo.querySelector(".deleteTodoButton");
    deleteTodoButton.addEventListener("click", () => {
        const event = new CustomEvent("deleteTodoClicked", {
            detail: { todoID, categoryID }
        });
        document.dispatchEvent(event);
    });
}

function getTodo(id) {
    return todoElements.find(todo => todo.getAttribute("todoID") === id.toString());
}

const projectConfigurationElemnt = createTextConfigurationElement("Project title:");
const editProjectConfigurationElemnt = createTextConfigurationElement("Project new title:");
const todoListConfigurationElemnt = createTextConfigurationElement("TodoList title:");
const editTodoListConfigurationElemnt = createTextConfigurationElement("TodoList new title:");
const addCategoryConfigurationElemnt = createTextConfigurationElement("Category title:");
const todoConfigurationElemnt = createTodoConfigurationElement();
const editCategoryConfigurationElemnt = createTextConfigurationElement("Category title:");


export {
    createProjectElement, removeProjectElement, setProjectTitle, getProject, createTodoListElement, removeTodoListElement, getTodoList, setTodoListTitle, displayTodoList, createCategoryElement, getCategory, createTodoElement,
    getTodo, setCategoryTitle, removeCategoryElement, setTodoInfo, removeTodoElement, showTodoListAreaConfiguration, setTodoListDesc, showTodoListDescriptionArea,
    projectConfigurationElemnt, editProjectConfigurationElemnt, todoListConfigurationElemnt, editTodoListConfigurationElemnt, addCategoryConfigurationElemnt, todoListDisplay, todoConfigurationElemnt, editCategoryConfigurationElemnt,
};