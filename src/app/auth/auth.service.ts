import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn = false;
  redirectUrl: string;


  login(): Observable<boolean> {
    console.log(' login this.isLoggedIn ' + this.isLoggedIn);
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }
  logout(): void {
    this.isLoggedIn = false;
    console.log(' logout this.isLoggedIn ' + this.isLoggedIn);
  }

}
