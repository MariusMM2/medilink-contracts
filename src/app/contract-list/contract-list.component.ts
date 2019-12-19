import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ContractService} from '../services/contract.service';
import {Contract} from '../entities/contract';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  contracts$: Observable<Contract[]>;
  sorted$: Contract[];
  isLoading$: Observable<boolean>;
  contractSearch: string;
  // isAdmin$: Observable<boolean>;

  constructor( private contractService: ContractService) {
  }
  ngOnInit() {
    this.isLoading$ = new Observable(subscriber => {
      subscriber.next(true);
      this.contracts$ = this.contractService.getContracts();
      this.contracts$.forEach(contracts => {
        // this.sorted$ = contracts.sort((a, b) => (parseInt(a.cost) > parseInt(b.cost)) ? 1 : ((parseInt(b.cost) > parseInt(a.cost)) ? -1 : 0));
        this.sorted$ = contracts.sort((a, b) => (a.cost > b.cost) ? 1 : (b.cost > a.cost) ? -1 : 0);
        this.sorted$.forEach( function (item, i) {
          item.location = addFlag(item.location);
        });
        console.log('- this.sorted$ after sort', this.sorted$);
      });
      setTimeout(() => {
        subscriber.next(false);
      }, 2000);
    });
  }

}
function addFlag(myCountry) {
  interface Flag {
    country: string;
    flag: string;
  }
  const flagDb: Flag[] = [
    {country: 'Denmark', flag: '🇩🇰'},
    {country: 'DK', flag: '🇩🇰'},
    {country: 'United States', flag: '🇺🇸'},
    {country: 'US', flag: '🇺🇸'},
    {country: 'United Kingdom', flag: '🇬🇧'},
    {country: 'UK', flag: '🇬🇧'},
  ];

  for (let i = 0; i <= flagDb.length - 1; i++) {
    if (myCountry.includes(flagDb[i].country)) {
      return myCountry + ' - ' + flagDb[i].flag;
    }
  }
  return myCountry + ' - Flag';
}
