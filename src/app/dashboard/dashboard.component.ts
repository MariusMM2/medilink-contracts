import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AdminService} from '../admin/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser;
  constructor(private authService: AuthService, private adminService: AdminService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
  }

  onLogoutClick() {
    this.authService.logout();
    this.adminService.logout();
    localStorage.setItem('currentUser', '');
  }
}
