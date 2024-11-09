import * as priorityModule from "./priority";

class Todo {
    constructor(id, title, description, dueDate, priority = priorityModule.Priority.Normal) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export { Todo };