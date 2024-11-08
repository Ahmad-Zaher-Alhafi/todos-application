import * as priorityModule from "./priority";

import * as todoModule from "./todo";

class Category {
    #todos = [];

    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    get todos() {
        return Object.freeze(...this.#todos);
    }

    addNewTodo(id, title, description, dueDate, priority = priorityModule.Priority.Normal) {
        const todo = new todoModule.Todo(id, title, description, dueDate, priority);
        this.#todos.push(todo)
    }

    removeTodoList(id) {

    }
}

export { Category };