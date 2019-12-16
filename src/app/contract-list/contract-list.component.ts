import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {ContractService} from '../services/contract.service';
import {Contract} from '../entities/contract';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit, AfterViewInit {
  contracts$: Observable<Contract[]>;
  isLoading$: Observable<boolean>;
  contractSearch: string;
  // isAdmin$: Observable<boolean>;

  // dataSource;
  displayedColumns: string[] = ['name', 'description'];

  ngOnInit() {

    this.isLoading$ = new Observable(subscriber => {
      subscriber.next(true);
      this.contracts$ = this.contractService.getContracts();
      this.contracts$.forEach(contracts => {
        // console.log('contracts before sort', contracts);
        contracts.sort((a, b) => (a.startDate > b.startDate) ? 1 : ((b.startDate > a.startDate) ? -1 : 0));
        // console.log('contracts after sort', contracts);
        return contracts;
      });
      setTimeout(() => {
        subscriber.next(false);
      }, 2000);
    });
  }

//   displayedColumns: string[] = ['name', 'startDate', 'expirationDate', 'category', 'cost', 'location'];

  constructor( private contractService: ContractService) {
  }

  ngAfterViewInit(): void {
  }
}
