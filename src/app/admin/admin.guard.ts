import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AdminService} from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private adminService: AdminService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.adminService.isAdmin) {
      console.log('is admin guard success: ' + this.adminService.isAdmin);
      return true;
    } else if (this.adminService.isSuperAdmin) {
      console.log('is superAdmin guard success: ' + this.adminService.isSuperAdmin);
      return true;
    }
    console.log(' admin guard failed?: ' + this.adminService.isAdmin);
    console.log(' superAdmin guard failed?: ' + this.adminService.isSuperAdmin);
    this.adminService.redirectUrl = state.url;
    this.router.navigate(['../dashboard/contract-list']);
    return false;
  }
}
