import * as todoListModule from "./todoList";
import * as priorityModule from "./priority";

class Project {
    #todoLists;
    #todoListID = 0;

    constructor(id, title, todoLists = []) {
        this.title = title;
        this.id = id;
        this.#todoLists = todoLists;
    }

    get todoLists() {
        return Object.freeze(...this.#todoLists);
    }

    addNewTodoList(title, description, dueDate, priority = priorityModule.Priority.Normal) {
        const todoList = new todoListModule.TodoList(title, description, dueDate, priority);
        this.#todoLists.push(todoList)

        return todoList;
    }

    removeTodoList(id) {
        const todoList = this.#todoLists.find(list => list.id === id);
        this.#todoLists.splice(this.#todoLists.indexOf(todoList), 1);
    }

    generateTodoListID() {
        return ++this.#todoListID;
    }
}

export { Project };