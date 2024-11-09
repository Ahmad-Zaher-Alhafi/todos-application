const lastGeneratedProjectIDKey = "lastGeneratedProjectID";
const lastGeneratedProjectID = JSON.parse(localStorage.getItem(lastGeneratedProjectIDKey)) || 0;

const lastGeneratedTodoListIDKey = "lastGeneratedTodoListID";
const lastGeneratedTodoListID = JSON.parse(localStorage.getItem(lastGeneratedTodoListIDKey)) || 0;

const lastGeneratedCategoryIDKey = "lastGeneratedCategoryID";
const lastGeneratedCategoryID = JSON.parse(localStorage.getItem(lastGeneratedCategoryIDKey)) || 0;

const lastGeneratedTodoIDKey = "lastGeneratedTodoID";
const lastGeneratedTodoID = JSON.parse(localStorage.getItem(lastGeneratedTodoIDKey)) || 0;

const projectsKey = "projects";
let projects = JSON.parse(localStorage.getItem(projectsKey)) || [];
projects = Array.isArray(projects) ? projects : [projects];

const todoListsKey = "todoLists";
let todoLits = JSON.parse(localStorage.getItem(todoListsKey)) || [];
todoLits = Array.isArray(todoLits) ? todoLits : [todoLits];

const categoriesKey = "categories";
let categories = JSON.parse(localStorage.getItem(categoriesKey)) || [];
categories = Array.isArray(categories) ? categories : [categories];

const todosKey = "todos";
let todos = JSON.parse(localStorage.getItem(todosKey)) || [];
todos = Array.isArray(todos) ? todos : [todos];

function storeProject(project) {
    if (projects.some(p => p.id === project.id)) return;

    projects.push(project);
    localStorage.setItem(projectsKey, JSON.stringify(projects));
}

function removeProject(project) {
    projects.splice(projects.find(p => p.id === project.id), 1);
    localStorage.setItem(projectsKey, JSON.stringify(projects));
}

function storeTodoList(todoList) {
    if (todoLits.includes(todoList)) return;

    todoLits.push(todoList);
    localStorage.setItem(todoListsKey, JSON.stringify(todoLits));
}

function storeCategory(category) {
    if (categories.includes(category)) return;

    categories.push(category);
    localStorage.setItem(categoriesKey, JSON.stringify(categories));
}

function storeTodo(todo) {
    if (todos.includes(todo)) return;

    todos.push(todo);
    localStorage.setItem(todosKey, JSON.stringify(todos));
}

function getProjects() {
    return projects;
}

function getTodoLists() {
    return todoLits;
}

function getCategories() {
    return categories;
}

function getTodos() {
    return todos;
}

function cleareStorage() {
    localStorage.clear();
}

function storeLastGeneratedProjectID(id) {
    localStorage.setItem(lastGeneratedProjectIDKey, id);
}

function storeLastGeneratedTodoListID(id) {
    localStorage.setItem(lastGeneratedTodoListIDKey, id);
}

function storeLastGeneratedCategoryID(id) {
    localStorage.setItem(lastGeneratedCategoryIDKey, id);
}

function storeLastGeneratedTodoID(id) {
    localStorage.setItem(lastGeneratedTodoIDKey, id);
}

export {
    storeProject, storeTodoList, storeCategory, storeTodo,
    getProjects, getTodoLists, getCategories, getTodos,
    cleareStorage,
    lastGeneratedProjectID, lastGeneratedTodoListID, lastGeneratedCategoryID, lastGeneratedTodoID,
    storeLastGeneratedProjectID, storeLastGeneratedTodoListID, storeLastGeneratedCategoryID, storeLastGeneratedTodoID,
    removeProject,
};