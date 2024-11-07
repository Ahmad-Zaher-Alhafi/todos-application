import "./styles.css";
import { compareAsc, format } from "date-fns";
import * as projectModule from "./project";
import * as domGeneratorModule from "./domGenerator";
import * as priorityModule from "./priority";

const projects = [];
let projectID = 0;

const addProjectButton = document.querySelector(".addProjectButton");
addProjectButton.addEventListener("click", addProjectClicked);

const projectConfiguration = document.querySelector(".projectConfiguration");
projectConfiguration.remove();

const addProjectSection = document.querySelector(".addProjectSection");


// const firstTodoList = testingProject.addNewTodoList("First todo list", "This is the first list of todos", format(new Date(2025, 5, 17), "yyyy-MM-dd"));
// firstTodoList.addNewTodo("Clean your shit", "You have to clean your shit or you will die from smell", format(new Date(2025, 5, 10), "yyyy-MM-dd"));

function generateProjectID() {
    return ++projectID;
}

function addProjectClicked() {
    addProjectSection.appendChild(projectConfiguration);
    const addProjectConfirmButton = document.querySelector(".addProjectConfirmButton");
    addProjectConfirmButton.addEventListener("click", addProjectConfirmed)
}

function addProjectConfirmed(event) {
    const projectTitleInput = event.target.parentElement.querySelector(".projectTitleInput");
    const project = new projectModule.Project(generateProjectID(), projectTitleInput.value);
    projects.push(project);
    domGeneratorModule.createProjectElement(project.id, project.title);

    console.log(projects);
}

document.addEventListener("deleteProjectClicked", deleteProjectClicked);

function deleteProjectClicked(event) {
    const projectID = event.projectID;
    projects.find(project => project.id === projectID)
    domGeneratorModule.removeProjectElemnt(event.projectID);

    console.log(projects);
}