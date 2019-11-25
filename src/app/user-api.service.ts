import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private baseUrl = 'http://localhost:3000/api/users/';

  constructor( private http: HttpClient ) { }

  createUser(user: User): Observable<any> {
    return this.http.post<User>(this.baseUrl + 'register', user);
  }

}
