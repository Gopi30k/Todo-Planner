import { Injectable } from "@angular/core";
import { Todo } from "./todo";
@Injectable({
  providedIn: "root"
})
export class TodoDataService {
  lastId: number = 0;
  todos: Todo[] = [];

  constructor() {
    this.todos = this.getLocalStorage();
    if (this.todos) {
      this.lastId = this.todos[this.todos.length - 1].id;
    } else {
      this.todos = [];
    }
  }

  getLocalStorage(): Todo[] {
    if (localStorage.getItem("todosLocal")) {
      return JSON.parse(localStorage.getItem("todosLocal"));
    } else {
      return null;
    }
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  getTodobyId(id: number): Todo {
    return this.todos.filter(todo => todo.id === id).pop();
  }
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodobyId(id);
    if (!todo) {
      return null;
    } else {
      Object.assign(todo, values);
      return todo;
    }
  }

  deleteTodobyId(id: number): TodoDataService {
    this.todos = this.todos.filter(todo => todo.id !== id);
    console.log(this.todos);
    return this;
  }

  markTodoComplete(todoCompleted: Todo) {
    let completedTodo = this.updateTodoById(todoCompleted.id, {
      complete: !todoCompleted.complete
    });
    return completedTodo;
  }
}