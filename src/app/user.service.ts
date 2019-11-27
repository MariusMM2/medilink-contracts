import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private fireAuth: AngularFireAuth) {
  }

  isLoggedIn(): boolean {
    return this.fireAuth.auth.currentUser != null;
  }

  getLoggedUser(): User {
    return this.fireAuth.auth.currentUser;
  }

  signOut(): Promise<void> {
    return this.fireAuth.auth.signOut();
  }

  tryLogin(email, password): Promise<void | UserCredential> {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }
}
