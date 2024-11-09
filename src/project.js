import * as todoListModule from "./todoList";
import * as priorityModule from "./priority";
import * as storageManagerModule from "./storageManager";

class Project {
    #todoLists;

    constructor(id, title, todoLists = []) {
        this.title = title;
        this.id = id;
        this.#todoLists = todoLists;
    }

    get todoLists() {
        return Object.freeze([...this.#todoLists]);
    }

    addNewTodoList(id, title, description, dueDate, priority = priorityModule.Priority.Normal) {
        const todoList = new todoListModule.TodoList(id, title, description, dueDate, priority);
        this.#todoLists.push(todoList)

        return todoList;
    }

    removeTodoList(id) {
        const todoList = this.#todoLists.find(list => list.id === id);
        this.#todoLists.splice(this.#todoLists.indexOf(todoList), 1);
        storageManagerModule.removeTodoList(id);
    }

    setTitle(title) {
        this.title = title;
    }

    getTodoList(id) {
        return this.#todoLists.find(todoList => todoList.id === id);
    }

    removeAllTodoLists() {
        this.todoLists.forEach(todoList => {
            this.removeTodoList(todoList.id);
        });
    }
}

export { Project };