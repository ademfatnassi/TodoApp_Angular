import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogged: boolean;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.isLogged = this.userService.islogged();
  }

  logout() {
    localStorage.removeItem('FormaLab');
    this.router.navigate(['/connexion']);
  }

}
