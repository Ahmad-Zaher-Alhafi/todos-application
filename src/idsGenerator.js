let projectID = 0;
let todoListID = 0;
let todoId = 0;

function generateProjectID() {
    return ++projectID;
}

function generateTodoListID() {
    return ++todoListID;
}

function generateTodoID() {
    return ++todoId;
}

export { generateProjectID, generateTodoListID, generateTodoID };