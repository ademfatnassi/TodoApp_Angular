import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todosList = [];
  public donesList = [];


  constructor(private todoService: TodoService, private toastr: ToastrService) {

  }

  // intialiser les
  ngOnInit() {
    let token = localStorage.getItem('FormaLab');
    let helper = new JwtHelperService();
    let decodedToken = helper.decodeToken(token);

    console.log(decodedToken.id + ' ' + decodedToken.role);

    this.todoService.allTodo(decodedToken.id).subscribe(
      (result) => {
        console.log(result);
        this.todosList = result.todos;
        this.donesList = result.dones;
      });

  }

  deleteToDo(i: number) {

    this.todoService.deleteTodo(this.todosList[i]._id).subscribe(
      (result) => {
        // console.log(result);
        this.toastr.success('Delete Todo effectuée avec succes');
      });
    this.todosList.splice(i, 1);
  }
  deleteEndedToDo(i: number) {
    this.todoService.deleteTodo(this.donesList[i]._id).subscribe(
      (result) => {
        // console.log(result);
        this.toastr.success('Delete Ended Todo effectuée avec succes');
      });
    this.donesList.splice(i, 1);
  }
  doneTodo(todo, i) {
    this.todoService.doneTodo(this.todosList[i]._id, this.todosList[i]).subscribe(
      (result) => {
        this.toastr.success('Done To do :) !');
      }
    );
    this.todosList.splice(i, 1);
    todo.endeddate = new Date();
    this.donesList.push(todo);
  }



}
