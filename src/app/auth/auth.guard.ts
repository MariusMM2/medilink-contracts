import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      console.log('auth guard success: ' + this.authService.isLoggedIn);
      const token = window.localStorage.getItem('token');
      console.log('token: ', token);
      if (token) {

      }
      return true;
    }
    console.log('auth guard failed: ' + this.authService.isLoggedIn);
    this.authService.redirectUrl = state.url;
    this.router.navigate(['../home/login']);
    return false;
  }

}
