import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserApiService} from '../user-api.service';
import {User} from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // used for validation of the values from the login form
  loginForm: FormGroup;

  // form builder is used to create instances of the form group
  // router is used for navigation after the form is successfully submitted
  constructor( private formBuilder: FormBuilder, private router: Router, private userApi: UserApiService ) {
  }

  ngOnInit() {
    // login form validators
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      // tslint:disable-next-line:max-line-length
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])/)]],
    });
  }

  clearErrorMessage() {
    document.getElementById('emailErrMsg').innerHTML = '';
    document.getElementById('passwordErrMsg').innerHTML = '';
  }

  onSubmit() {
    console.log(this.loginForm);
    const user = this.loginForm.value as User;
    console.log('user: ', user);
    if (this.loginForm.valid) {
      this.userApi.loginUser(user).subscribe(backendRes => { // arrow function
        console.log('backend response:', backendRes);

        if (backendRes.status === 200) {
          this.router.navigate([''])
            .then(() => {
              console.log('Successfully logged in!');
            })
            .catch(e => {
              console.log('An error occurred: ', e);
            });
        } else if (backendRes.status === 401) {

          document.getElementById('emailErrMsg').innerHTML = backendRes.message + '<br><br>';

        } else if (backendRes.status === 400) {

          document.getElementById('passwordErrMsg').innerHTML = backendRes.message + '<br><br>';

        }

      }, error => {
        console.log('Error: ', error);
      });
    } else {
      console.log('Invalid form!');
    }
  }

}
