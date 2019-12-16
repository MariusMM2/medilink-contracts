import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {ContractService} from '../services/contract.service';
import {Contract} from '../entities/contract';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {filter} from 'rxjs/operators';

// export interface PeriodicElement {
//   name: string;
//   position: number;
// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen'},
//   {position: 2, name: 'Hydrogen2'},
//   {position: 3, name: 'Hydrogen3'},
// ];

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit{
  contracts$: Observable<Contract[]>;
  sorted$: Contract[];
  isLoading$: Observable<boolean>;
  contractSearch: string;
  // isAdmin$: Observable<boolean>;

  ngOnInit() {
    this.isLoading$ = new Observable(subscriber => {
      subscriber.next(true);
      this.contracts$ = this.contractService.getContracts();
      this.contracts$.forEach(contracts => {
        // this.sorted$ = contracts.sort((a, b) => (a.cost > b.cost) ? 1 : (b.cost > a.cost) ? -1 : 0));
        this.sorted$ = contracts.sort((a, b) => (parseInt(a.cost) > parseInt(b.cost)) ? 1 : ((parseInt(b.cost) > parseInt(a.cost)) ? -1 : 0));
        console.log('- this.sorted$ after sort', this.sorted$);
      });
      setTimeout(() => {
        subscriber.next(false);
      }, 2000);
    });
  }

  constructor( private contractService: ContractService) {
  }
}
