import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('FormaLab');

    if (!token) {
      this.router.navigate(['/']);
      return false;
    } else {
      let helper = new JwtHelperService();
      let decodedToken = helper.decodeToken(token);
      if (decodedToken.role === 'Admin') {
        this.router.navigate(['/']);
        return false;
      } else { return true; }
    }

  }
}

