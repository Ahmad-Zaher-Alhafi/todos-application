import * as priorityModule from "./priority";

class Todo {
    constructor(id, categoryID, todoListID, projectID, title, description, dueDate, priority = priorityModule.Priority.Normal) {
        this.id = id;
        this.categoryID = categoryID;
        this.todoListID = todoListID;
        this.projectID = projectID;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export { Todo };