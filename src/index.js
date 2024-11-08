import "./styles.css";
import { compareAsc, format } from "date-fns";
import * as projectModule from "./project";
import * as todoListModule from "./todoList";
import * as domGeneratorModule from "./domGenerator";
import * as priorityModule from "./priority";

const projects = [];
let projectID = 0;

const addProjectButton = document.querySelector(".addProjectButton");
addProjectButton.addEventListener("click", addProjectClicked);

const addProjectSection = document.querySelector(".addProjectSection");

// const firstTodoList = testingProject.addNewTodoList("First todo list", "This is the first list of todos", format(new Date(2025, 5, 17), "yyyy-MM-dd"));
// firstTodoList.addNewTodo("Clean your shit", "You have to clean your shit or you will die from smell", format(new Date(2025, 5, 10), "yyyy-MM-dd"));

function generateProjectID() {
    return ++projectID;
}

function getProject(projectID) {
    return projects.find(project => project.id === projectID);
}

function addProjectClicked() {
    addProjectSection.appendChild(domGeneratorModule.projectConfigurationElemnt);
    const configurationConfirmButton = document.querySelector(".configurationConfirmButton");
    configurationConfirmButton.addEventListener("click", addProjectConfirmed)
}

function addProjectConfirmed(event) {
    const configurationTitleInput = event.target.parentElement.querySelector(".configurationTitleInput");
    const project = new projectModule.Project(generateProjectID(), configurationTitleInput.value);
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

    const configurationConfirmButton = editProjectConfiguration.querySelector(".configurationConfirmButton");
    configurationConfirmButton.addEventListener("click", (event) => {
        const customEvent = new CustomEvent("editProjectConfirmed", {
            detail: { target: event.target, projectID }
        });
        document.dispatchEvent(customEvent);
    })
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
    const configurationConfirmButton = todoListConfiguration.querySelector(".configurationConfirmButton");
    configurationConfirmButton.addEventListener("click", (event) => {
        const customEvent = new CustomEvent("addTodoListConfirmed", {
            detail: { target: event.target, projectID }
        });
        document.dispatchEvent(customEvent);
    })
}

document.addEventListener("addTodoListConfirmed", addTodoListConfirmed);

function addTodoListConfirmed(event) {
    const configurationTitleInput = event.detail.target.parentElement.querySelector(".configurationTitleInput");
    const todoListTitle = configurationTitleInput.value;
    const project = getProject(event.detail.projectID)
    const todoListID = project.generateTodoListID();
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
    const edittodoListConfigurationElemnt = domGeneratorModule.edittodoListConfigurationElemnt;
    edittodoListConfigurationElemnt.remove();
    const todoListID = event.detail.todoListID;
    const todoList = domGeneratorModule.getTodoList(todoListID);
    todoList.appendChild(edittodoListConfigurationElemnt);

    // const configurationConfirmButton = edittodoListConfigurationElemnt.querySelector(".configurationConfirmButton");
    // configurationConfirmButton.addEventListener("click", (event) => {
    //     const customEvent = new CustomEvent("editProjectConfirmed", {
    //         detail: { target: event.target, projectID }
    //     });
    //     document.dispatchEvent(customEvent);
    // })
}