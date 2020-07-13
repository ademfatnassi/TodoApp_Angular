import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  addTodo(todo: Todo) {
    return this.http.post<any>('http://localhost:3000/todo/add', todo);
  }

  allTodo(id) {
    return this.http.get<any>('http://localhost:3000/todo/all/' + id);
  }

  deleteTodo(Tid) {
    return this.http.delete<any>('http://localhost:3000/todo/delete/' + Tid);
  }

  doneTodo(id, todo: Todo) {
    return this.http.put<any>('http://localhost:3000/todo/one/' + id, todo);
  }

  updateTodo(id, title) {
    return this.http.put<any>('http://localhost:3000/todo/update/' + id, title);
  }

}
