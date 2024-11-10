import * as priorityModule from "./priority";
import * as storageManagerModule from "./storageManager";
import * as todoModule from "./todo";

class Category {
    #todos = [];

    constructor(id, todoListID, projectID, title) {
        this.id = id;
        this.todoListID = todoListID;
        this.projectID = projectID;
        this.title = title;
    }

    get todos() {
        return Object.freeze([...this.#todos]);
    }

    addNewTodo(id, title, description, dueDate, priority = priorityModule.Priority.Normal) {
        const todo = new todoModule.Todo(id, this.id, this.todoListID, this.projectID, title, description, dueDate, priority);
        this.#todos.push(todo)
        return todo;
    }

    removeTodo(id) {
        const todo = this.#todos.find(todo => todo.id === id);
        this.#todos.splice(this.#todos.indexOf(todo), 1);
        storageManagerModule.removeTodo(id);
    }

    getAllTodos() {
        return this.todos;
    }

    removeAllTodos() {
        this.todos.forEach(todo => {
            this.removeTodo(todo.id);
        });
    }

    setTitle(title) {
        this.title = title;
    }

    getTodo(id) {
        return this.#todos.find(todo => todo.id === id);
    }
}

export { Category };