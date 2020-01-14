import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    // console.log(user.id);

    // this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    console.log('this.currentUser', this.currentUser);
    console.log('this.currentUserId', this.currentUser.id);
    console.log('this.currentUserFirstName', this.currentUser.firstName);
    console.log('this.currentUserLastName', this.currentUser.lastName);

    // this.userRole$ = new Observable(subscriber => {
    //   subscriber.next(true);
    //
    //   this.products$ = this.productService.getProducts();
    //
    //   setTimeout(()=>{
    //     subscriber.next(false);
    //   }, 2000)
    // });
  }

  onLogoutClick() {
    this.authService.logout();
    localStorage.setItem('currentUser', '');
  }
}
