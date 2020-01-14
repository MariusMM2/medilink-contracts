import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../entities/user';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user: Observable<User>;
  userForm: FormGroup;

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  updateUser() {
    const user = this.userForm.value as User;

    this.userService.updateUser(user)
    // .then(() => {
      .subscribe(() => {
        console.log('user updated!');
        this.snackBar.open('User updated', '', {duration: 500}).afterDismissed().subscribe(() => {
          this.router.navigate(['../dashboard/contract-list']);
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
