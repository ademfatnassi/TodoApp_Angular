import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  addForm: FormGroup;

  constructor(public fb: FormBuilder, private todoService: TodoService, private toastr: ToastrService, private router: Router) {
    this.addForm = fb.group({
      title: new FormControl('', [
        Validators.required, Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*')
      ])
    });
  }

  get title() { return this.addForm.get('title'); }

  ngOnInit() {


  }

  addTodo() {



    let data = this.addForm.value;

    let token = localStorage.getItem('FormaLab');
    let helper = new JwtHelperService();
    let decodedToken = helper.decodeToken(token);

    console.log(decodedToken.id);

    let todo = new Todo(data.title, new Date(), null, true, decodedToken.id as string);

    console.log(todo);


    this.todoService.addTodo(todo).subscribe(
      (result) => {
        this.toastr.success('Ajout todo effectuée avec succes');

        this.router.navigate(['./todo-list']);
      },
      (error) => {
        console.log(error.error);

        this.toastr.error(error.error.message);
      }
    );
  }

}
