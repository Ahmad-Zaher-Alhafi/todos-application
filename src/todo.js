import * as priorityModule from "./priority";

class Todo {
    constructor(title, description, dueDate, priority = priorityModule.Priority.Normal) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    // setTitle();
    // setDescriptoin();
    // setDueDate();
    // setPriority();
}

export { Todo };