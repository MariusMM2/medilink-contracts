import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';
import {User} from '../entities/user';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users$: Observable<User[]>;
  isLoading$: Observable<boolean>;

  constructor( private userService: UserService) { }

  ngOnInit() {
    this.isLoading$ = new Observable(subscriber => {
      subscriber.next(true);

      this.users$ = this.userService.getUsers();
      console.log('this.users$', this.users$);
      setTimeout(() => {
        subscriber.next(false);
      }, 2000);
    });
  }

}
