import {Component} from '@angular/core';

@Component({
  selector: 'app-error-user',
  template: 'NO UI',
  styleUrls: ['./error-user.component.css']
})
export class ErrorUserComponent {
  protected error: string;

  constructor() {
    this.error = '';
  }

  // On a normal function, for some reason, 'this' gets undefined
  // when called from a subclass by function reference
  // While on an arrow function, it gets preserved
  protected parseError = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(this.error);

    switch (errorCode) {
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        this.error = 'Invalid Username or Password.';
        break;
      default:
        this.error = errorMessage;
    }
    console.log('errorCode:' + errorCode);
    console.log('errorMessage:' + errorMessage);
  };

  protected clearError() {
    this.error = '';
  }
}
