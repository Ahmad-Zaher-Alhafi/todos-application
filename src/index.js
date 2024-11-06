import "./styles.css";
import { compareAsc, format } from "date-fns";
import * as projectModule from "./project";
import * as priorityModule from "./priority";

const testingProject = new projectModule.Project("Do testing stuff");

const firstTodoList = testingProject.addNewTodoList("First todo list", "This is the first list of todos", format(new Date(2025, 5, 17), "yyyy-MM-dd"));
firstTodoList.addNewTodo("Clean your shit", "You have to clean your shit or you will die from smell", format(new Date(2025, 5, 10), "yyyy-MM-dd"));


console.log(firstTodoList);
