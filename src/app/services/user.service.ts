import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user';
import { Observable } from 'rxjs';
import {Contract} from '../entities/contract';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor( private http: HttpClient ) { }

  createUser(user: User): Observable<any> {
    return this.http.post<User>(this.baseUrl + 'register', user);
  }

  loginUser(user: User): Observable<any> {
    return this.http.post<User>(this.baseUrl + 'login', user);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + `/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  updateUser(user: User): Observable<any> {
    console.log('-----------** ', user);
    return this.http.put<User>(this.baseUrl + `/${user.id}`, user);
  }

}
