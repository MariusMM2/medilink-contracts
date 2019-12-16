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
  statisticsDateCurrent = 0;
  statisticsDateExpired = 0;
  statisticsDateNotStarted = 0;

  constructor( private contractService: ContractService) {
  }

  ngOnInit() {
    this.isLoading$ = new Observable(subscriber => {
      subscriber.next(true);
      this.contracts$ = this.contractService.getContracts();
      this.contracts$.forEach(contracts => {
        [this.statisticsDateCurrent, this.statisticsDateExpired, this.statisticsDateNotStarted] =
          generateDateStatistics(contracts, this.statisticsDateCurrent,
                                            this.statisticsDateExpired,
                                            this.statisticsDateNotStarted);
        // generateCostStatistics(contracts);
        // generateLocationStatistics(contracts);
      })
      setTimeout(() => {
        subscriber.next(false);
      }, 2000);
    });
  }
}

function generateDateStatistics(contracts, statisticsDateCurrent, statisticsDateExpired, statisticsDateNotStarted) {
  const currentDateString = formatDate(new Date());
  for (let i = 0; i < contracts.length; i++) {
    console.log('contracts[i].startDate: ', contracts[i].startDate);
    console.log('contracts[i].expirationDate: ', contracts[i].expirationDate);
    console.log('----currentDateString: ', currentDateString);

    if (contracts[i].startDate < currentDateString && currentDateString < contracts[i].expirationDate) {
      statisticsDateCurrent ++;
    }
    if (contracts[i].expirationDate < currentDateString) {
      statisticsDateExpired ++;
    }
    if ( currentDateString < contracts[i].startDate) {
      statisticsDateNotStarted ++;
    }
  }
  // console.log('-----------------------------------------------');
  // console.log('this.statisticsDateCurrent', this.statisticsDateCurrent);
  // console.log('this.statisticsDateExpired', this.statisticsDateExpired);
  // console.log('this.statisticsDateNotStarted', this.statisticsDateNotStarted);
  // console.log('-----------------------------------------------');
  return [statisticsDateCurrent, statisticsDateExpired, statisticsDateNotStarted];
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}