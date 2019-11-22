import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ContractApiService} from '../contract-api.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  constructor( private contractApi: ContractApiService) {
  }
  ngOnInit() {
  }

  showContractsFromApi() {
    console.log('showContractsFromApi');
    this.contractApi.getAllContracts().subscribe(ContractFromWs => {
      console.log(ContractFromWs);
      console.log('3');
      // this.quizActions.createQuiz(ContractFromWs);
      // this.router.navigate(['/portal/display-quizzes']);
    }, error => {
      // Write some code for if the ws breaks.
      console.log('something bad happened', error);
      // this.quizActions.createQuizFailed(error);
    });
  }
}
