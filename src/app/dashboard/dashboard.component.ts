import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUserId;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    // console.log(user.id);

    this.currentUserId = localStorage.getItem('currentUserId');
    console.log('this.currentUserId', this.currentUserId);

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
  }
}
