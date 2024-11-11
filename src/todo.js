import * as priorityModule from "./priority";

class Todo {
    constructor(id, categoryID, todoListID, projectID, title, description, dueDate, priority, isDone) {
        this.id = id;
        this.categoryID = categoryID;
        this.todoListID = todoListID;
        this.projectID = projectID;
        this.setInfo(title, description, dueDate, priority, isDone);
    }

    setInfo(title, description, dueDate, priority, isDone) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = isDone;
    }
}

export { Todo };