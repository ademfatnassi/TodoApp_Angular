import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post<any>('http://localhost:3000/user/register', user);
  }

  connexionUser(user: User) {
    return this.http.post<any>('http://localhost:3000/user/login', user);
  }

  AllUser() {
    return this.http.get<any>('http://localhost:3000/admin/gestion-user');
  }

  activateUser(id) {
    return this.http.get<any>('http://localhost:3000/admin/activate/' + id);
  }

  desactivateUser(id) {
    return this.http.get<any>('http://localhost:3000/admin/desactivate/' + id);
  }

  deleteUser(id) {
    return this.http.delete<any>('http://localhost:3000/admin/delete/' + id);
  }

  updateUser(user: User){
    return this.http.put<any>('http://localhost:3000/admin/update/', user);
  }

  islogged() {
    const token = localStorage.getItem('FormaLab');

    if (token) {
      return true;
    } else {
      return false;
    }
  }

}
