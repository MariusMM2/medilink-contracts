import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Contract } from './entities/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractApiService {

  private baseUrl = 'https://developer.microsoft.com/en-us/graph/graph-explorer/preview';
  // private baseUrl: string = 'http://angular2api2.azurewebsites.net/api/internships';

  constructor(private http: HttpClient) { }

  getAllContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.baseUrl);
    // return this.http.get<Contract[]>(this.baseUrl);
  }
  // createQuiz(quiz: Quiz) : Observable<any> {
  //   quiz.customerId = 'chrk3';
  //   quiz.created = new Date();
  //   return this.http.post(this.baseUrl, quiz);
  // }
  //
  // getAllQuizzes(): Observable<Quiz[]> {
  //   return this.http.get<Quiz[]>(this.baseUrl);
  // }
  //
  // updateQuiz(quiz: Quiz) : Observable<any> {
  //   return undefined;
  // }
  //
  // deleteQuiz(id: string) : Observable<any> {
  //   return undefined;
  // }

}
