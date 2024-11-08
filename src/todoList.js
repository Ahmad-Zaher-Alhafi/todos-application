import * as categoryModule from "./category";

class TodoList {
    #categories;

    constructor(id, projectID, title, description, dueDate, priority, categories = []) {
        this.id = id;
        this.projectID = projectID;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.#categories = categories;
    }

    get categories() {
        return Object.freeze(...this.#categories);
    }

    addNewCategory(id, title) {
        const category = new categoryModule.Category(id, title);
        this.#categories.push(category)
    }

    removeCategory(id) {

    }

    setTitle(title) {
        this.title = title;
    }

}

export { TodoList };