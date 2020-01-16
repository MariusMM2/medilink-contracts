import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../entities/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-admin-change-role',
  templateUrl: './admin-change-role.component.html',
  styleUrls: ['./admin-change-role.component.css']
})
export class AdminChangeRoleComponent implements OnInit {

  user: Observable<User>;
  userForm: FormGroup;

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  updateUser() {
    const user = this.userForm.value as User;

    this.userService.updateUser(user)
      .subscribe(() => {
        localStorage.setItem('currentUser', JSON.stringify({user}));
        console.log('user updated!');
        this.snackBar.open('User updated', '', {duration: 500}).afterDismissed().subscribe(() => {
          this.router.navigate(['../dashboard/admin-panel']);
        });
      });
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      id: [''],
      email: [''],
      firstName: [''],
      lastName: [''],
      password: [''],
      emailVerified: [''],
      active: [''],
      role: [''],
      notificationEmail: [''],
      proposedRole: [''],
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.user = this.userService.getUser(id);
    console.log('-- this.user', this.user);
  }
}
