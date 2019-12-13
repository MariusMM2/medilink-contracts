import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Contract} from '../entities/contract';
import {ContractService} from '../services/contract.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  contracts$: Observable<Contract[]>;
  isLoading$: Observable<boolean>;
  data$: Array<Contract>;

  constructor( private contractService: ContractService) {
  }

  ngOnInit() {

    // const entitie$: Observable<Contract[]> = this.myService.filter(2).share(); // 1
    // let data: [Contract[]] = []; // 2
    // let count: number = 0; // 3

    // entitie$.subscribe(ent => this.data.push(ent)); // 4
    // entitie$.reduce((state, curr) => state + 1, 0).subscribe(c => count = c); // 5
    //


    this.isLoading$ = new Observable(subscriber => {
      subscriber.next(true);

      this.contracts$ = this.contractService.getContracts();

      // this.data$.push(this.contracts$.pipe());
      console.log('------ ' + this.contracts$);

      setTimeout(() => {
        subscriber.next(false);
      }, 2000);
    });

    // console.log('this.isLoading$ ' + this.isLoading$);
    // console.log('this.data ' + this.data);
  }


  // countActiveContracts(){
  //
  // }

}
