import "./styles.css";
import { compareAsc, format } from "date-fns";
import * as projectModule from "./project";
import * as domGeneratorModule from "./domGenerator";
import * as priorityModule from "./priority";
import * as idsGeneratorModule from "./idsGenerator";
import * as storageManagerModule from "./storageManager";

const projects = [];
let displayedTodoList;
let displayedProject;

const addProjectButton = document.querySelector(".addProjectButton");
addProjectButton.addEventListener("click", addProjectClicked);

const addProjectSection = document.querySelector(".addProjectSection");

function getProject(projectID) {
    return projects.find(project => project.id === projectID);
}

function addProjectClicked() {
    addProjectSection.appendChild(domGeneratorModule.projectConfigurationElemnt);
    const configurationConfirmButton = document.querySelector(".configurationConfirmButton");
    configurationConfirmButton.removeEventListener("click", addProjectConfirmed)
    configurationConfirmButton.addEventListener("click", addProjectConfirmed)

    configurationConfirmButton.parentElement.querySelector(".configurationTitleInput").focus();
}

function addProjectConfirmed(event) {
    const configurationTitleInput = event.target.parentElement.querySelector(".configurationTitleInput");
    let projectTitle = configurationTitleInput.value;
    projectTitle = projectTitle === "" ? "Project" : projectTitle;
    addProject(idsGeneratorModule.generateProjectID(), projectTitle);
    event.target.parentElement.remove();
}

function addProject(id, title) {
    const project = new projectModule.Project(id, title);
    projects.push(project);
    domGeneratorModule.createProjectElement(project.id, project.title);
    storageManagerModule.storeProject(project);
}

function loadStoredProjects() {
    const savedProjects = storageManagerModule.getProjects();

    savedProjects.forEach(project => {
        addProject(project.id, project.title);
    });
}

document.addEventListener("deleteProjectClicked", deleteProjectClicked);

function deleteProjectClicked(event) {
    const projectID = event.detail.projectID;
    const project = getProject(projectID);
    projects.splice(projects.indexOf(project), 1);
    domGeneratorModule.removeProjectElement(projectID);
    project.removeAllTodoLists();
    storageManagerModule.removeProject(projectID);
}

document.addEventListener("editProjectClicked", editProjectClicked);

function editProjectClicked(event) {
    const editProjectConfiguration = domGeneratorModule.editProjectConfigurationElemnt;
    editProjectConfiguration.remove();
    const projectID = event.detail.projectID;
    const project = domGeneratorModule.getProject(projectID);
    const todoLists = project.querySelector(".todoLists");
    project.insertBefore(editProjectConfiguration, todoLists);

    let configurationConfirmButton = editProjectConfiguration.querySelector(".configurationConfirmButton");
    editProjectConfiguration.replaceChild(configurationConfirmButton.cloneNode(true), configurationConfirmButton);
    configurationConfirmButton = editProjectConfiguration.querySelector(".configurationConfirmButton");
    configurationConfirmButton.addEventListener("click", (event) => createEditProjectConfirmedEvent(event, projectID));
}

function createEditProjectConfirmedEvent(event, projectID) {
    const customEvent = new CustomEvent("editProjectConfirmed", {
        detail: { target: event.target, projectID }
    });

    document.dispatchEvent(customEvent);
}

document.addEventListener("editProjectConfirmed", editProjectConfirmed);

function editProjectConfirmed(event) {
    const configurationTitleInput = event.detail.target.parentElement.querySelector(".configurationTitleInput");
    const projectTitle = configurationTitleInput.value;
    const project = getProject(event.detail.projectID);
    project.setTitle(projectTitle);
    domGeneratorModule.setProjectTitle(project.id, projectTitle);
    storageManagerModule.storeProject(project);
}

document.addEventListener("addTodoListClicked", addTodoListClicked);

function addTodoListClicked(event) {
    const todoListConfiguration = domGeneratorModule.todoListConfigurationElemnt;
    todoListConfiguration.remove();
    const projectID = event.detail.projectID;
    const project = domGeneratorModule.getProject(projectID);
    project.querySelector(".addTodoListSection").appendChild(todoListConfiguration);
    let configurationConfirmButton = todoListConfiguration.querySelector(".configurationConfirmButton");
    todoListConfiguration.replaceChild(configurationConfirmButton.cloneNode(true), configurationConfirmButton); // To get rid of all event listeners on the button
    configurationConfirmButton = todoListConfiguration.querySelector(".configurationConfirmButton");
    configurationConfirmButton.addEventListener("click", (event) => createAddTodoListConfirmedEvent(event, projectID));

    configurationConfirmButton.parentElement.querySelector(".configurationTitleInput").focus();
}

function createAddTodoListConfirmedEvent(event, projectID) {
    const customEvent = new CustomEvent("addTodoListConfirmed", {
        detail: { target: event.target, projectID }
    });

    document.dispatchEvent(customEvent);
}

document.addEventListener("addTodoListConfirmed", addTodoListConfirmed);

function addTodoListConfirmed(event) {
    const configurationTitleInput = event.detail.target.parentElement.querySelector(".configurationTitleInput");
    let todoListTitle = configurationTitleInput.value;
    todoListTitle = todoListTitle === "" ? "Todo List" : todoListTitle;

    const projectID = event.detail.projectID;
    const todoListID = idsGeneratorModule.generateTodoListID();
    addTodoList(todoListID, projectID, todoListTitle, "Todo list description");
    displayTodoList(todoListID, projectID)
    event.detail.target.parentElement.remove();
}

function addTodoList(todoListID, projectID, todoListTitle, todoListDescription) {
    const project = getProject(projectID)
    const todoList = project.addNewTodoList(todoListID, projectID, todoListTitle, todoListDescription);
    domGeneratorModule.createTodoListElement(todoList.id, project.id, todoList.title, todoList.description);
    storageManagerModule.storeTodoList(todoList);
}

function loadStoredTodoLists() {
    const savedTodoLists = storageManagerModule.getTodoLists();

    savedTodoLists.forEach(todoList => {
        addTodoList(todoList.id, todoList.projectID, todoList.title, todoList.description);
    });
}

document.addEventListener("deleteTodoListClicked", deleteTodoListClicked);

function deleteTodoListClicked(event) {
    const projectID = event.detail.projectID;
    const todoListID = event.detail.todoListID;
    const project = getProject(projectID);
    project.removeTodoList(todoListID);
    domGeneratorModule.removeTodoListElement(todoListID);
}

document.addEventListener("editTodoListClicked", editTodoListClicked);

function editTodoListClicked(event) {
    const editTodoListConfigurationElemnt = domGeneratorModule.editTodoListConfigurationElemnt;
    editTodoListConfigurationElemnt.remove();
    const todoListID = event.detail.todoListID;
    const projectID = event.detail.projectID;
    const todoList = domGeneratorModule.getTodoList(todoListID);
    todoList.appendChild(editTodoListConfigurationElemnt);

    let configurationConfirmButton = editTodoListConfigurationElemnt.querySelector(".configurationConfirmButton");
    editTodoListConfigurationElemnt.replaceChild(configurationConfirmButton.cloneNode(true), configurationConfirmButton);
    configurationConfirmButton = editTodoListConfigurationElemnt.querySelector(".configurationConfirmButton");
    configurationConfirmButton.addEventListener("click", (event) => createEditTodoListConfirmedEvent(event, projectID, todoListID));
}

function createEditTodoListConfirmedEvent(event, projectID, todoListID) {
    const customEvent = new CustomEvent("editTodoListConfirmed", {
        detail: { target: event.target, projectID, todoListID }
    });

    document.dispatchEvent(customEvent);
}

document.addEventListener("editTodoListConfirmed", editTodoListConfirmed);

function editTodoListConfirmed(event) {
    const configurationTitleInput = event.detail.target.parentElement.querySelector(".configurationTitleInput");
    const todoListTitle = configurationTitleInput.value;
    const project = getProject(event.detail.projectID);
    const todoListID = event.detail.todoListID;
    const todoList = project.getTodoList(todoListID);
    todoList.setTitle(todoListTitle);
    domGeneratorModule.setTodoListTitle(todoListID, todoListTitle);
    storageManagerModule.storeTodoList(todoList);
}

document.addEventListener("editTodoListDescClicked", editTodoListDescClicked);

function editTodoListDescClicked() {
    domGeneratorModule.showTodoListAreaConfiguration();
}

document.addEventListener("editTodoListDescConfirmed", editTodoListDescConfirmed);

function editTodoListDescConfirmed(event) {
    const newTodoListDesc = event.detail.newTodoListDesc;
    displayedTodoList.setDescription(newTodoListDesc);
    domGeneratorModule.showTodoListDescriptionArea(newTodoListDesc);
    storageManagerModule.storeTodoList(displayedTodoList);
}

document.addEventListener("todoListClicked", todoListClicked);

function todoListClicked(event) {
    const projectID = event.detail.projectID;
    const todoListID = event.detail.todoListID;
    displayTodoList(todoListID, projectID);
}

function displayTodoList(todoListID, projectID) {
    if (todoListID == null || projectID == null) return;

    const project = getProject(projectID);
    const todoList = project.getTodoList(todoListID);

    displayedTodoList = todoList;
    displayedProject = project;

    const categories = todoList.getAllCategories();

    domGeneratorModule.displayTodoList(todoList.title, todoList.description, categories);

    storageManagerModule.storeLastDisplayedProjectIndex(projectID);
    storageManagerModule.storeLastDisplayedTodoListIndex(todoListID);

    domGeneratorModule.showDisplayedTodoListBorderInSideBar(todoListID);
}

document.addEventListener("addCategoryClicked", addCategoryClicked);

function addCategoryClicked() {
    const addCategorySection = domGeneratorModule.todoListDisplay.querySelector(".addCategorySection");
    const addCategoryConfigurationElemnt = domGeneratorModule.addCategoryConfigurationElemnt;
    addCategorySection.appendChild(addCategoryConfigurationElemnt);

    let configurationConfirmButton = addCategoryConfigurationElemnt.querySelector(".configurationConfirmButton");
    addCategoryConfigurationElemnt.replaceChild(configurationConfirmButton.cloneNode(true), configurationConfirmButton);
    configurationConfirmButton = addCategoryConfigurationElemnt.querySelector(".configurationConfirmButton");
    configurationConfirmButton.addEventListener("click", addCategoryConfirmed);

    configurationConfirmButton.parentElement.querySelector(".configurationTitleInput").focus();
}

function addCategoryConfirmed(event) {
    const configurationTitleInput = event.target.parentElement.querySelector(".configurationTitleInput");
    let categoryTitle = configurationTitleInput.value;
    categoryTitle = categoryTitle === "" ? "Category" : categoryTitle;

    const projectID = displayedProject.id;
    const todoListID = displayedTodoList.id;

    addCategory(idsGeneratorModule.generateCategoryID(), todoListID, projectID, categoryTitle);
    event.target.parentElement.remove();
}

function addCategory(id, todoListID, projectID, title) {
    const project = getProject(projectID);
    const todoList = project.getTodoList(todoListID);
    const category = todoList.addNewCategory(id, todoListID, projectID, title);
    domGeneratorModule.createCategoryElement(id, title);

    storageManagerModule.storeCategory(category);
}

function loadStoredCategories() {
    const savedCategories = storageManagerModule.getCategories();

    savedCategories.forEach(category => {
        addCategory(category.id, category.todoListID, category.projectID, category.title);
    });
}

document.addEventListener("editCategoryClicked", editCategoryClicked);

function editCategoryClicked(event) {
    const editCategoryConfigurationElemnt = domGeneratorModule.editCategoryConfigurationElemnt;
    editCategoryConfigurationElemnt.remove();
    const categoryID = event.detail.categoryID;
    const category = domGeneratorModule.getCategory(categoryID);
    category.querySelector(".categoryHeader").appendChild(editCategoryConfigurationElemnt);

    let configurationConfirmButton = editCategoryConfigurationElemnt.querySelector(".configurationConfirmButton");
    editCategoryConfigurationElemnt.replaceChild(configurationConfirmButton.cloneNode(true), configurationConfirmButton);
    configurationConfirmButton = editCategoryConfigurationElemnt.querySelector(".configurationConfirmButton");
    configurationConfirmButton.addEventListener("click", (event) => createEditCategoryConfirmedEvent(event, categoryID));
}

function createEditCategoryConfirmedEvent(event, categoryID) {
    const customEvent = new CustomEvent("editCategoryConfirmed", {
        detail: { target: event.target, categoryID }
    });

    document.dispatchEvent(customEvent);
}

document.addEventListener("editCategoryConfirmed", editCategoryConfirmed);

function editCategoryConfirmed(event) {
    const configurationTitleInput = event.detail.target.parentElement.querySelector(".configurationTitleInput");
    const categoryTitle = configurationTitleInput.value;
    const categoryID = event.detail.categoryID;
    const category = displayedTodoList.getCategory(categoryID);
    category.setTitle(categoryTitle);
    domGeneratorModule.setCategoryTitle(categoryID, categoryTitle);
    storageManagerModule.storeCategory(category);
}

document.addEventListener("deleteCategoryClicked", deleteCategoryClicked);

function deleteCategoryClicked(event) {
    const categoryID = event.detail.categoryID;
    displayedTodoList.removeCategory(categoryID);
    domGeneratorModule.removeCategoryElement(categoryID);
}

document.addEventListener("addTodoClicked", addTodoClicked);

function addTodoClicked(event) {
    const projectID = displayedProject.id;
    const todoListID = displayedTodoList.id;
    const categoryID = event.detail.categoryID;

    const category = domGeneratorModule.getCategory(categoryID, todoListID, projectID);

    const addTodoSection = category.querySelector(".addTodoSection");
    const todoConfigurationElemnt = domGeneratorModule.todoConfigurationElemnt;
    addTodoSection.appendChild(todoConfigurationElemnt);

    let configurationConfirmButton = todoConfigurationElemnt.querySelector(".configurationConfirmButton");
    todoConfigurationElemnt.querySelector(".configurationButtons").replaceChild(configurationConfirmButton.cloneNode(true), configurationConfirmButton);
    configurationConfirmButton = todoConfigurationElemnt.querySelector(".configurationConfirmButton");
    configurationConfirmButton.addEventListener("click", () => createTodoConfirmedEvent(todoConfigurationElemnt, categoryID));

    todoConfigurationElemnt.querySelector(".configurationTitleInput").focus();
}

function createTodoConfirmedEvent(todoConfigurationElemnt, categoryID) {
    const customEvent = new CustomEvent("addTodoConfirmed", {
        detail: { target: todoConfigurationElemnt, categoryID }
    });

    document.dispatchEvent(customEvent);
}

document.addEventListener("addTodoConfirmed", addTodoConfirmed);

function addTodoConfirmed(event) {

    const configurationTitleInput = event.detail.target.querySelector(".configurationTitleInput");
    let todoTitle = configurationTitleInput.value;
    todoTitle = todoTitle === "" ? "Todo" : todoTitle;

    const configurationDescInput = event.detail.target.querySelector(".configurationDescInput");
    let todoDesc = configurationDescInput.value;
    todoDesc = todoDesc === "" ? "Todo description" : todoDesc;

    const configurationDueDateInput = event.detail.target.querySelector(".configurationDueDateInput");
    const todoDueDate = configurationDueDateInput.value;

    const configurationPriorityDropDown = event.detail.target.querySelector(".configurationPriorityDropDown");
    const todoPriority = configurationPriorityDropDown.value;

    const categoryID = event.detail.categoryID;

    addTodo(idsGeneratorModule.generateTodoID(), categoryID, displayedTodoList.id, displayedProject.id, todoTitle, todoDesc, todoDueDate, todoPriority, false);

    event.detail.target.remove();
}

function addTodo(id, categoryID, todoListID, projectID, title, description, dueDate, priority, isDone) {
    const project = getProject(projectID);
    const todoList = project.getTodoList(todoListID);
    const category = todoList.getCategory(categoryID);

    const todo = category.addNewTodo(id, title, description, dueDate, priority, isDone);
    domGeneratorModule.createTodoElement(id, categoryID, title, description, dueDate, priority, isDone);

    storageManagerModule.storeTodo(todo);
}

document.addEventListener("editTodoClicked", editTodoClicked);

function editTodoClicked(event) {
    const todoConfigurationElemnt = domGeneratorModule.todoConfigurationElemnt;
    todoConfigurationElemnt.remove();
    const todoID = event.detail.todoID;
    const categoryID = event.detail.categoryID;
    const todo = domGeneratorModule.getTodo(todoID);
    todo.appendChild(todoConfigurationElemnt);

    let configurationConfirmButton = todoConfigurationElemnt.querySelector(".configurationConfirmButton");
    todoConfigurationElemnt.querySelector(".configurationButtons").replaceChild(configurationConfirmButton.cloneNode(true), configurationConfirmButton);
    configurationConfirmButton = todoConfigurationElemnt.querySelector(".configurationConfirmButton");
    configurationConfirmButton.addEventListener("click", (event) => createEditTodoConfirmedEvent(event, todoID, categoryID));
}

function createEditTodoConfirmedEvent(event, todoID, categoryID) {
    const customEvent = new CustomEvent("editTodoConfirmed", {
        detail: { target: event.target, todoID, categoryID }
    });

    document.dispatchEvent(customEvent);
}

document.addEventListener("editTodoConfirmed", editTodoConfirmed);

function editTodoConfirmed(event) {
    const configurationTitleInput = event.detail.target.parentElement.querySelector(".configurationTitleInput");
    const todoTitle = configurationTitleInput.value;

    const configurationDescInput = event.detail.target.parentElement.querySelector(".configurationDescInput");
    const todoDesc = configurationDescInput.value;

    const configurationDueDateInput = event.detail.target.parentElement.querySelector(".configurationDueDateInput");
    const todoDueDate = configurationDueDateInput.value;

    const configurationPriorityDropDown = event.detail.target.parentElement.querySelector(".configurationPriorityDropDown");
    const todoPriority = configurationPriorityDropDown.value;

    const todoID = event.detail.todoID;
    const categoryID = event.detail.categoryID;;
    const category = displayedTodoList.getCategory(categoryID);
    const todo = category.getTodo(todoID);
    todo.setInfo(todoTitle, todoDesc, todoDueDate, todoPriority);
    domGeneratorModule.setTodoInfo(todoID, todoTitle, todoDesc, todoDueDate, todoPriority);
    storageManagerModule.storeTodo(todo);
}

document.addEventListener("deleteTodoClicked", deleteTodoClicked);

function deleteTodoClicked(event) {
    const categoryID = event.detail.categoryID;
    const todoID = event.detail.todoID;
    const category = displayedTodoList.getCategory(categoryID);
    category.removeTodo(todoID);
    domGeneratorModule.removeTodoElement(todoID);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Delete") {
        storageManagerModule.cleareStorage();
        console.log("Storage cleared!");
    }
});

document.addEventListener("todoCheckClicked", todoCheckClicked);

function todoCheckClicked(event) {
    const todoID = event.detail.todoID;
    const categoryID = event.detail.categoryID;
    const category = displayedTodoList.getCategory(categoryID);
    const todo = category.getTodo(todoID);
    const todoElement = domGeneratorModule.getTodo(todoID);
    const todoCheck = todoElement.querySelector(".todoCheck");
    const isChecked = todoCheck.checked;
    todo.setInfo(todo.title, todo.description, todo.dueDate, todo.priority, isChecked);
    domGeneratorModule.changeTodoTitleStyle(todoID, isChecked);
    storageManagerModule.storeTodo(todo);
}

function loadStoredTodos() {
    const savedTodos = storageManagerModule.getTodos();

    savedTodos.forEach(todo => {
        addTodo(todo.id, todo.categoryID, todo.todoListID, todo.projectID, todo.title, todo.description, todo.dueDate, todo.priority, todo.isDone);
    });
}

function loadLastDisplayedTodoList() {
    const lastDisplayedProjectIndex = storageManagerModule.lastDisplayedProjectIndex;
    const lastDisplayedTodoListIndex = storageManagerModule.lastDisplayedTodoListIndex;

    displayTodoList(lastDisplayedTodoListIndex, lastDisplayedProjectIndex);
}

loadStoredProjects();
loadStoredTodoLists();
loadStoredCategories();
loadStoredTodos();
loadLastDisplayedTodoList();