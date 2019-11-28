import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {ErrorUserComponent} from '../error-user/error-user.component';

// custom validator to check that two fields match
export function mustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends ErrorUserComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  error: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private users: UserService) {
    super();
    this.error = '';
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      }, {
        validator: mustMatch('password', 'confirmPassword')
      });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.submitted = true;
    if (this.registerForm.valid) {
      this.users.tryRegister(this.registerForm.value.email, this.registerForm.value.password).then(() => {

        console.log('tryRegister:onFulfilled');
        this.users.tryLogin(this.registerForm.value.email, this.registerForm.value.password).then(() => {

          console.log('tryLogin:onFulfilled');
          this.users.sendVerification().then(() => {

            this.router.navigate(['PLACEHOLDER']);
          }, this.parseError);
        });
      }, this.parseError);

    } else {
      console.log('Invalid form!');
    }
  }
}

