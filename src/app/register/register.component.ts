import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
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
export class RegisterComponent implements OnInit {

  // used for validation of the values from the register form
  registerForm: FormGroup;

  // form builder is used to create instances of the form group
  // router is used for navigation after the form is successfully submitted
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    // register form validators
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      // check if there is at least one uppercase char, one lowercase char, one number and a special character3
      // tslint:disable-next-line:max-line-length
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])/)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit() {
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      this.router.navigate([''])
        .then(() => {
          console.log('Successfully registered in!');
        })
        .catch(e => {
          console.log('An error occurred: ', e);
        });
    } else {
      console.log('Invalid form!');
    }
  }

}
