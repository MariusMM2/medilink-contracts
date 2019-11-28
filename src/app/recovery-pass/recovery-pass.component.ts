import {Component, OnInit} from '@angular/core';
import {ErrorUserComponent} from '../error-user/error-user.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-recovery-pass',
  templateUrl: './recovery-pass.component.html',
  styleUrls: ['./recovery-pass.component.css']
})
export class RecoveryPassComponent extends ErrorUserComponent implements OnInit {
  recoveryForm: FormGroup;
  recoveryMessage: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private users: UserService) {
    super();
    this.recoveryMessage = '';
  }

  ngOnInit() {
    this.recoveryForm = this.formBuilder.group(
      {
        recoveryEmail: ['', [Validators.required, Validators.email]]
      }
    );
  }

  onSubmit() {
    console.log(this.recoveryForm.value);

    if (this.users.isLoggedIn()) {
      this.users.signOut().then(() => {

        this.onSubmit();
      });
      return;
    }

    this.users.sendRecoveryEmail(this.recoveryForm.value.recoveryEmail).then(() => {
      this.clearError();
      this.recoveryMessage = 'Email sent to ' + this.recoveryForm.value.recoveryEmail;
    }, this.parseError);
  }

  onBackToLogin() {
    this.router.navigate(['login']);
  }
}
