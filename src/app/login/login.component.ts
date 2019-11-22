import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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
  constructor( private formBuilder: FormBuilder, private router: Router ) {
  }

  ngOnInit() {
    // login form validators
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      // tslint:disable-next-line:max-line-length
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])/)]],
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      console.log('Successfully logged in!');
      // this.router.navigate(['']);
    } else {
      console.log('Invalid form!');
    }
  }

}
