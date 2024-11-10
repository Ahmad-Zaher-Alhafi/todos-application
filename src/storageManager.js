const lastGeneratedProjectIDKey = "lastGeneratedProjectID";
const lastGeneratedProjectID = JSON.parse(localStorage.getItem(lastGeneratedProjectIDKey)) || 0;

const lastGeneratedTodoListIDKey = "lastGeneratedTodoListID";
const lastGeneratedTodoListID = JSON.parse(localStorage.getItem(lastGeneratedTodoListIDKey)) || 0;

const lastGeneratedCategoryIDKey = "lastGeneratedCategoryID";
const lastGeneratedCategoryID = JSON.parse(localStorage.getItem(lastGeneratedCategoryIDKey)) || 0;

const lastGeneratedTodoIDKey = "lastGeneratedTodoID";
const lastGeneratedTodoID = JSON.parse(localStorage.getItem(lastGeneratedTodoIDKey)) || 0;

const lastDisplayedProjectIndexKey = "lastDisplayedProjectIndex";
const lastDisplayedProjectIndex = JSON.parse(localStorage.getItem(lastDisplayedProjectIndexKey));

const lastDisplayedTodoListIndexKey = "lastDisplayedTodoListIndex";
const lastDisplayedTodoListIndex = JSON.parse(localStorage.getItem(lastDisplayedTodoListIndexKey));

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
    const sameStoredProject = projects.find(p => p.id === project.id);

    if (sameStoredProject !== undefined) {
        // If already exist then just replace it with the new one that has new information
        projects[projects.indexOf(sameStoredProject)] = project;
    } else {
        projects.push(project);
    }

    localStorage.setItem(projectsKey, JSON.stringify(projects));
}

function removeProject(projectID) {
    projects.splice(projects.indexOf(projects.find(p => p.id === projectID)), 1);
    localStorage.setItem(projectsKey, JSON.stringify(projects));
}

function storeTodoList(todoList) {
    const sameStoredTodoList = todoLits.find(t => t.id === todoList.id);

    if (sameStoredTodoList !== undefined) {
        // If already exist then just replace it with the new one that has new information
        todoLits[todoLits.indexOf(sameStoredTodoList)] = todoList;
    } else {
        todoLits.push(todoList);
    }

    localStorage.setItem(todoListsKey, JSON.stringify(todoLits));
}

function removeTodoList(todoListID) {
    todoLits.splice(todoLits.indexOf(todoLits.find(t => t.id == todoListID)), 1);
    localStorage.setItem(todoListsKey, JSON.stringify(todoLits));
}

function storeCategory(category) {
    if (categories.some(c => c.id === category.id)) return;

    categories.push(category);
    localStorage.setItem(categoriesKey, JSON.stringify(categories));
}

function removeCategory(categoryID) {
    categories.splice(categories.indexOf(categories.find(c => c.id == categoryID)), 1);
    localStorage.setItem(categoriesKey, JSON.stringify(categories));
}

function storeTodo(todo) {
    if (todos.some(t => t.id === todo.id)) return;

    todos.push(todo);
    localStorage.setItem(todosKey, JSON.stringify(todos));
}

function removeTodo(todoID) {
    todos.splice(todos.indexOf(todos.find(t => t.id == todoID)), 1);
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

function storeLastDisplayedProjectIndex(id) {
    localStorage.setItem(lastDisplayedProjectIndexKey, id);
}

function storeLastDisplayedTodoListIndex(id) {
    localStorage.setItem(lastDisplayedTodoListIndexKey, id);
}

export {
    storeProject, storeTodoList, storeCategory, storeTodo,
    getProjects, getTodoLists, getCategories, getTodos,
    cleareStorage,
    lastGeneratedProjectID, lastGeneratedTodoListID, lastGeneratedCategoryID, lastGeneratedTodoID,
    storeLastGeneratedProjectID, storeLastGeneratedTodoListID, storeLastGeneratedCategoryID, storeLastGeneratedTodoID,
    removeProject, removeTodoList, removeCategory, removeTodo,
    storeLastDisplayedProjectIndex, storeLastDisplayedTodoListIndex, lastDisplayedProjectIndex, lastDisplayedTodoListIndex,
};