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
}

function addProjectConfirmed(event) {
    const configurationTitleInput = event.target.parentElement.querySelector(".configurationTitleInput");
    const projectTitle = configurationTitleInput.value;
    addProject(idsGeneratorModule.generateProjectID(), projectTitle);
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
    const todoListTitle = configurationTitleInput.value;

    const projectID = event.detail.projectID;
    const todoListID = idsGeneratorModule.generateTodoListID();
    addTodoList(todoListID, projectID, todoListTitle, "Todo list discreption", format(new Date(1, 5, 2025), "dd-mm-yyyy"), priorityModule.Priority.High);
}

function addTodoList(todoListID, projectID, todoListTitle, todoListDesc, dueDate, priority) {
    const project = getProject(projectID)
    const todoList = project.addNewTodoList(todoListID, projectID, todoListTitle, todoListDesc, dueDate, priority);
    domGeneratorModule.createTodoListElement(todoList.id, project.id, todoList.title);
    storageManagerModule.storeTodoList(todoList);
}

function loadStoredTodoLists() {
    const savedTodoLists = storageManagerModule.getTodoLists();

    savedTodoLists.forEach(todoList => {
        addTodoList(todoList.id, todoList.projectID, todoList.title, todoList.description, todoList.dueDate, todoList.priority);
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

document.addEventListener("todoListClicked", todoListClicked);

function todoListClicked(event) {
    const projectId = event.detail.projectID;
    const todoListID = event.detail.todoListID;

    const project = getProject(projectId);
    const todoList = project.getTodoList(todoListID);
    displayedTodoList = todoList;
    displayedProject = project;

    const categories = todoList.getAllCategories();
    domGeneratorModule.displayTodoList(todoList.title, todoList.description, categories);
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
}

function addCategoryConfirmed(event) {
    const configurationTitleInput = event.target.parentElement.querySelector(".configurationTitleInput");
    const categoryTitle = configurationTitleInput.value;

    const projectID = displayedProject.id;
    const todoListID = displayedTodoList.id;

    addCategory(idsGeneratorModule.generateCategoryID(), todoListID, projectID, categoryTitle);
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

document.addEventListener("addTodoClicked", addTodoClicked);

function addTodoClicked(event) {
    const projectID = displayedProject.id;
    const todoListID = displayedTodoList.id;
    const categoryID = event.detail.categoryID;

    const category = domGeneratorModule.getCategory(categoryID, todoListID, projectID);

    const addTodoSection = category.querySelector(".addTodoSection");
    const addTodoConfigurationElemnt = domGeneratorModule.addTodoConfigurationElemnt;
    addTodoSection.appendChild(addTodoConfigurationElemnt);

    let configurationConfirmButton = addTodoConfigurationElemnt.querySelector(".configurationConfirmButton");
    addTodoConfigurationElemnt.replaceChild(configurationConfirmButton.cloneNode(true), configurationConfirmButton);
    configurationConfirmButton = addTodoConfigurationElemnt.querySelector(".configurationConfirmButton");
    configurationConfirmButton.addEventListener("click", (event) => createTodoConfirmedEvent(event, categoryID));
}

function createTodoConfirmedEvent(event, categoryID) {
    const customEvent = new CustomEvent("addTodoConfirmed", {
        detail: { target: event.target, categoryID }
    });

    document.dispatchEvent(customEvent);
}

document.addEventListener("addTodoConfirmed", addTodoConfirmed);

function addTodoConfirmed(event) {

    const configurationTitleInput = event.detail.target.parentElement.querySelector(".configurationTitleInput");
    const todoTitle = configurationTitleInput.value;

    const categoryID = event.detail.categoryID;
    console.log(categoryID);

    addTodo(idsGeneratorModule.generateTodoID(), categoryID, displayedTodoList.id, displayedProject.id, todoTitle, "Todo desc", format(new Date(2024, 9, 1), "yyyy-mm-dd"), priorityModule.Priority.High);
}

function addTodo(id, categoryID, todoListID, projectID, title, descreption, dueDate, priority) {
    const project = getProject(projectID);
    const todoList = project.getTodoList(todoListID);
    const category = todoList.getCategory(categoryID);

    const todo = category.addNewTodo(id, title, descreption, dueDate, priority);
    domGeneratorModule.createTodoElement(id, categoryID, title, descreption, dueDate, priority);

    storageManagerModule.storeTodo(todo);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Delete") {
        storageManagerModule.cleareStorage();
        console.log("Storage cleared!");
    }
});

function loadStoredTodos() {
    const savedTodos = storageManagerModule.getTodos();

    savedTodos.forEach(todo => {
        addTodo(todo.id, todo.categoryID, todo.todoListID, todo.projectID, todo.title, todo.descreption, todo.dueDate, todo.priority);
    });
}

loadStoredProjects();
loadStoredTodoLists();
loadStoredCategories();
loadStoredTodos();
