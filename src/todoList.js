import * as categoryModule from "./category";
import * as storageManagerModule from "./storageManager";

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
        return Object.freeze([...this.#categories]);
    }

    addNewCategory(id, todoListID, projectID, title) {
        const category = new categoryModule.Category(id, todoListID, projectID, title);
        this.#categories.push(category)
        return category;
    }

    removeCategory(id) {
        const category = this.#categories.find(category => category.id === id);
        category.removeAllTodos();
        this.#categories.splice(this.#categories.indexOf(category), 1);
        storageManagerModule.removeCategory(id);
    }

    setTitle(title) {
        this.title = title;
    }

    getCategory(id) {
        return this.#categories.find(category => category.id === id);
    }

    getAllCategories() {
        return this.categories;
    }

    removeAllCategories() {
        this.categories.forEach(category => {
            this.removeCategory(category.id);
        });
    }

}

export { TodoList };