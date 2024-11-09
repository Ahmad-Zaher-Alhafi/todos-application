let projectID = 0;
let todoListID = 0;
let todoId = 0;
let categoryId = 0;

function generateProjectID() {
    return ++projectID;
}

function generateTodoListID() {
    return ++todoListID;
}

function generateCategoryID() {
    return ++categoryId;
}

function generateTodoID() {
    return ++todoId;
}

export { generateProjectID, generateTodoListID, generateTodoID, generateCategoryID };