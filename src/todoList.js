import * as priorityModule from "./priority";
import * as todoModule from "./todo";

class TodoList {
    #todos;

    constructor(title, description, dueDate, priority, todos = []) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.#todos = todos;
    }

    get todos() {
        return Object.freeze(...this.#todos);
    }

    addNewTodo(title, description, dueDate, priority = priorityModule.Priority.Normal) {
        const todo = new todoModule.Todo(title, description, dueDate, priority);
        this.#todos.push(todo)
    }

    removeTodoList(title) {
        this.#todos.find(todo => todo.title === title)?.pop();
    }

    // setTitle();
    // setDescriptoin();
    // setDueDate();
    // setPriority();
}

export { TodoList };