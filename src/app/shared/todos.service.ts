import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import * as moment from "moment";

export interface Todo {
  id?: string,
  title: string,
  date?: string,
}

interface CreateResponse {
  name: string
}

@Injectable({
  providedIn: 'root',
})
export  class TodosService {
  public static url = 'https://angular-practice-organiz-28bde-default-rtdb.europe-west1.firebasedatabase.app/todos';

  constructor(
    private http: HttpClient,
  ) { }

  addNewTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post<CreateResponse>(`${TodosService.url}/${todo.date}.json`, todo)
      .pipe(map(response => {
        return {
          id: response.name,
          ...todo,
        };
      }))
  }

  deleteTodo(todo: Todo): Observable<void> {
    return this.http.delete<void>(`${TodosService.url}/${todo.date}/${todo.id}.json`);
  }

  loadTodos(currentDate: moment.Moment): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(`${TodosService.url}/${currentDate.format('DD-MM-YYYY')}.json`)
      .pipe(map(todos => {
        if(!todos) {
          return [];
        } else {
          return Object.keys(todos)
            .map((key: string | any): Todo => { // any is not a good idea(
              return {
                id: key,
                title: todos[key].title,
                date: todos[key].date,
              };
            });
        }
      }))
  }
}
