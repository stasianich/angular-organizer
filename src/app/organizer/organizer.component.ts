import { Component, OnInit } from '@angular/core';
import { DateService } from "../shared/date.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Todo, TodosService } from "../shared/todos.service";
import * as moment from "moment";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public todos: Todo[] = [];

  constructor(
    private dateService: DateService,
    private todoService: TodosService
  ) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(currentDate => this.todoService.loadTodos(currentDate))
    ).subscribe(todos => {
      this.todos = todos;
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  getDate() {
    return this.dateService.date;
  }

  addTodo() {
    const { title } = this.form.value;

    const todo: Todo = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    }

    this.todoService.addNewTodo(todo).subscribe(
      todo => {
        this.todos.push(todo);
        this.form.reset();
      },
      error => console.warn(error)
    );
  }

  removeTodo(todo: Todo) {
    this.todoService.deleteTodo(todo)
      .subscribe(
        () => {
          this.todos = this.todos.filter(todoFromList => todoFromList.id !== todo.id);
        },
        error => console.error(error),
        );
  }
}
