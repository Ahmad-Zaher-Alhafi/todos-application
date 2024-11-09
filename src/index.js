import "./styles.css";
import { compareAsc, format } from "date-fns";
import * as projectModule from "./project";
import * as domGeneratorModule from "./domGenerator";
import * as priorityModule from "./priority";
import * as idsGeneratorModule from "./idsGenerator";
import * as storageManagerModule from "./storageManager";

const projects = [];

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

    console.log(projects);
}

function addProject(id, title) {
    const project = new projectModule.Project(id, title);
    projects.push(project);
    domGeneratorModule.createProjectElement(project.id, project.title);
    storageManagerModule.storeProject(project);

    console.log(storageManagerModule.getProjects());
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

    console.log(projects);
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
    const todoList = project.setTitle(projectTitle);
    domGeneratorModule.setProjectTitle(project.id, projectTitle);

    console.log(projects);
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
    const project = getProject(event.detail.projectID)
    const todoListID = idsGeneratorModule.generateTodoListID();
    const todoList = project.addNewTodoList(todoListID, project.id, todoListTitle, "Todo list discreption", format(new Date(1, 5, 2025), "dd-mm-yyyy"), priorityModule.Priority.High);
    domGeneratorModule.createTodoListElement(todoList.id, project.id, todoList.title);

    console.log(projects);
}

document.addEventListener("deleteTodoListClicked", deleteTodoListClicked);

function deleteTodoListClicked(event) {
    const projectID = event.detail.projectID;
    const todoListID = event.detail.todoListID;
    const project = getProject(projectID);
    project.removeTodoList(todoListID);
    domGeneratorModule.removeTodoListElement(todoListID);

    console.log(projects);
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

    console.log(projects);
}

document.addEventListener("todoListClicked", todoListClicked);

function todoListClicked(event) {
    const projectId = event.detail.projectID;
    const todoListID = event.detail.todoListID;

    const project = getProject(projectId);
    const todoList = project.getTodoList(todoListID);

    domGeneratorModule.displayTodoList(todoListID, projectId, todoList.title, todoList.description);
}

document.addEventListener("addCategoryClicked", addCategoryClicked);

function addCategoryClicked(event) {
    const projectID = event.detail.projectID;
    const todoListID = event.detail.todoListID;

    const addCategorySection = domGeneratorModule.todoListDisplay.querySelector(".addCategorySection");
    const addCategoryConfigurationElemnt = domGeneratorModule.addCategoryConfigurationElemnt;
    addCategorySection.appendChild(addCategoryConfigurationElemnt);

    let configurationConfirmButton = addCategoryConfigurationElemnt.querySelector(".configurationConfirmButton");
    addCategoryConfigurationElemnt.replaceChild(configurationConfirmButton.cloneNode(true), configurationConfirmButton);
    configurationConfirmButton = addCategoryConfigurationElemnt.querySelector(".configurationConfirmButton");
    configurationConfirmButton.addEventListener("click", (event) => createCategoryConfirmedEvent(event, projectID, todoListID));
}

function createCategoryConfirmedEvent(event, projectID, todoListID) {
    const customEvent = new CustomEvent("addCategoryConfirmed", {
        detail: { target: event.target, projectID, todoListID }
    });

    document.dispatchEvent(customEvent);
}

document.addEventListener("addCategoryConfirmed", addCategoryConfirmed);

function addCategoryConfirmed(event) {
    const configurationTitleInput = event.detail.target.parentElement.querySelector(".configurationTitleInput");
    const categoryTitle = configurationTitleInput.value;
    const project = getProject(event.detail.projectID);
    const todoListID = event.detail.todoListID;
    const todoList = project.getTodoList(todoListID);
    const category = todoList.addNewCategory(idsGeneratorModule.generateCategoryID, categoryTitle);
    domGeneratorModule.createCategoryElement(category.id, todoList.id, project.id, category.title);

    console.log(projects);
}

document.addEventListener("addTodoClicked", addTodoClicked);

function addTodoClicked(event) {
    const projectID = event.detail.projectID;
    const todoListID = event.detail.todoListID;
    const categoryID = event.detail.categoryID;

    const category = domGeneratorModule.getCategory(categoryID, todoListID, projectID);

    const addTodoSection = category.querySelector(".addTodoSection");
    const addTodoConfigurationElemnt = domGeneratorModule.addTodoConfigurationElemnt;
    addTodoSection.appendChild(addTodoConfigurationElemnt);

    let configurationConfirmButton = addTodoConfigurationElemnt.querySelector(".configurationConfirmButton");
    addTodoConfigurationElemnt.replaceChild(configurationConfirmButton.cloneNode(true), configurationConfirmButton);
    configurationConfirmButton = addTodoConfigurationElemnt.querySelector(".configurationConfirmButton");
    configurationConfirmButton.addEventListener("click", (event) => createTodoConfirmedEvent(event, projectID, todoListID, categoryID));
}

function createTodoConfirmedEvent(event, projectID, todoListID, categoryID) {
    const customEvent = new CustomEvent("addTodoConfirmed", {
        detail: { target: event.target, projectID, todoListID, categoryID }
    });

    document.dispatchEvent(customEvent);
}

document.addEventListener("addTodoConfirmed", addTodoConfirmed);

function addTodoConfirmed(event) {
    const configurationTitleInput = event.detail.target.parentElement.querySelector(".configurationTitleInput");
    const todoTitle = configurationTitleInput.value;
    const project = getProject(event.detail.projectID);
    const todoListID = event.detail.todoListID;
    const todoList = project.getTodoList(todoListID);
    const categoryID = event.detail.categoryID;
    const category = todoList.getCategory(categoryID);

    const todo = category.addNewTodo(idsGeneratorModule.generateTodoID, todoTitle, "Todo desc", format(new Date(2024, 9, 1), "yyyy-mm-dd"), priorityModule.Priority.High);
    domGeneratorModule.createTodoElement(todo.id, todo.title, todo.description, todo.dueDate, todo.priority);

    console.log(projects);
}


loadStoredProjects();