import "./styles.css";
import { compareAsc, format } from "date-fns";
import * as projectModule from "./project";
import * as todoListModule from "./todoList";
import * as domGeneratorModule from "./domGenerator";
import * as priorityModule from "./priority";
import * as idsGeneratorModule from "./idsGenerator";

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
    const project = new projectModule.Project(idsGeneratorModule.generateProjectID(), configurationTitleInput.value);
    projects.push(project);
    domGeneratorModule.createProjectElement(project.id, project.title);

    console.log(projects);
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

    domGeneratorModule.displayTodoList(todoList.title, todoList.description);
}

document.addEventListener("addCategoryClicked", addCategoryClicked);

function addCategoryClicked() {
   const addCategorySection = domGeneratorModule.todoListDisplay.querySelector(".addCategorySection");
   const addCategoryConfigurationElemnt = domGeneratorModule.addCategoryConfigurationElemnt;
   addCategorySection.appendChild(addCategoryConfigurationElemnt);
}