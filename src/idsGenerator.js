import * as storageManagerModule from "./storageManager";

let projectID = storageManagerModule.lastGeneratedProjectID;
let todoListID = storageManagerModule.lastGeneratedTodoListID;
let categoryId = storageManagerModule.lastGeneratedCategoryID;
let todoId = storageManagerModule.lastGeneratedTodoID;

function generateProjectID() {
    projectID += 1
    storageManagerModule.storeLastGeneratedProjectID(projectID);
    return projectID;
}

function generateTodoListID() {
    todoListID += 1
    storageManagerModule.storeLastGeneratedTodoListID(todoListID);
    return todoListID;
}

function generateCategoryID() {
    categoryId += 1
    storageManagerModule.storeLastGeneratedCategoryID(categoryId);
    return categoryId;
}

function generateTodoID() {
    todoId += 1
    storageManagerModule.storeLastGeneratedTodoID(todoId);
    return todoId;
}

export { generateProjectID, generateTodoListID, generateTodoID, generateCategoryID };