import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  connexionForm: FormGroup;

  constructor(public fb: FormBuilder, private userService: UserService, private toastr: ToastrService, private router: Router) {
    this.connexionForm = fb.group({
      email: new FormControl('', [
        Validators.required, Validators.email
      ]),
      password: new FormControl('', [
        Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')
      ])
    });
  }


  get email() { return this.connexionForm.get('email'); }
  get password() { return this.connexionForm.get('password'); }

  ngOnInit() {
    let islogged = this.userService.islogged();

    if (islogged) {
      this.router.navigate(['/todo-list']);
    }
  }

  connexion() {
    let data = this.connexionForm.value;
    let user = new User(null, null, null, data.email, data.password);
    console.log(user);

    this.userService.connexionUser(user).subscribe(
      (result) => {
        this.toastr.success('Connexion effectuée');

        let token = result.token;
        localStorage.setItem('FormaLab', token);

        let helper = new JwtHelperService();
        let decodedToken = helper.decodeToken(token);

        console.log(decodedToken.role);

        if (decodedToken.role === 'User') {
          this.router.navigate(['./todo-list']);
        } else {
          this.router.navigate(['./admin/gestion-users']);
        }


      },
      (error) => {
        console.log(error.error);

        this.toastr.error(error.error.message);
      }
    );
  }

}
