import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private users: UserService) {
    this.error = '';
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }
    );
  }

  onSubmit() {
    console.log(this.loginForm.value);
    if (this.users.isLoggedIn()) {
      this.users.signOut().then(() => {
        this.onSubmit();
      });
      return;
    }

    this.users.tryLogin(this.loginForm.value.email, this.loginForm.value.password).then(() => {
      console.log('onFulfilled');
      if (!this.error) {
        this.error = '';
        this.router.navigate(['PLACEHOLDER']);
      }
    }, (error) => {
      console.log('onRejected');
      const errorCode = error.code;
      const errorMessage = error.message;

      switch (errorCode) {
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          this.error = 'Invalid Username or Password.';
          break;
        default:
          this.error = errorMessage;
      }
      console.log('error:' + this.error);
    });
  }

}
