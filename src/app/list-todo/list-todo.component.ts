import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Todo } from "../todo";
import { TodoDataService } from "../todo-data.service";

@Component({
  selector: "app-list-todo",
  templateUrl: "./list-todo.component.html",
  styleUrls: ["./list-todo.component.css"]
})
export class ListTodoComponent implements OnInit {
  addTodoButton: boolean = false;
  editId: number;
  buttonText: boolean;
  newTodo: Todo = new Todo();
  @ViewChild("addFocus", { static: false }) focusAdd: ElementRef;
  @ViewChild("updateFocus", { static: false }) focusupdate: ElementRef;
  constructor(private todoService: TodoDataService) {}

  ngOnInit() {}

  addTodoList() {
    if (this.newTodo.title) {
      this.todoService.addTodo(this.newTodo);
      this.newTodo = new Todo();
    }
  }

  get todos() {
    return this.todoService.getAllTodos();
  }

  addButton() {
    this.addTodoButton = !this.addTodoButton;
    if (this.addTodoButton) {
      setTimeout(() => {
        this.focusAdd.nativeElement.focus();
      }, 0);
    }
  }

  markAsComplete(todoToMarkComplete) {
    this.todoService.markTodoComplete(todoToMarkComplete);
  }

  updateTodo(editingTodoId) {
    this.editId = editingTodoId;
    this.buttonText = !this.buttonText;
    if (this.buttonText) {
      setTimeout(() => {
        this.focusupdate.nativeElement.focus();
      }, 0);
    }
  }

  deleteTodo(deletingTodoId) {
    this.todoService.deleteTodobyId(deletingTodoId);
  }

  @HostListener("window:beforeunload")
  unloadHandler() {
    localStorage.setItem("todosLocal", JSON.stringify(this.todos));
  }
}