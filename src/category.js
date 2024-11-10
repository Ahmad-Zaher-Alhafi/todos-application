import * as priorityModule from "./priority";

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

    }

    getAllTodos() {
        return this.todos;
    }
}

export { Category };