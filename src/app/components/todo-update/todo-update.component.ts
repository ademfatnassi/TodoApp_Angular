import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TodoService } from 'src/app/services/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.css']
})
export class TodoUpdateComponent implements OnInit {

  updateForm: FormGroup;

  constructor(public fb: FormBuilder, private route: ActivatedRoute, private todoService: TodoService, private router: Router,
              private toastr: ToastrService) {
    this.updateForm = fb.group({
      title: new FormControl('', [
        Validators.required, Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*')
      ])
    });
  }

  get title() { return this.updateForm.get('title'); }

  ngOnInit() {
  }

  updateTodo() {
    console.log(this.updateForm.value);
    let data = this.updateForm.value;
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.todoService.updateTodo(id, data).subscribe((result) => {
      this.toastr.success('Update todo effectuée avec succes');
      this.router.navigate(['./todo-list']);
    });



  }

}
