import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../entities/user';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users: User[];
  isLoading: boolean;

  constructor(private userService: UserService) {
  }

  async ngOnInit() {
    this.isLoading = true;

    this.users = await this.userService.getUsers().toPromise();

    console.log('users: ', this.users);

    this.isLoading = false;
  }
}
