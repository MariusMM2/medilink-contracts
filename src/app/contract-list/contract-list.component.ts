import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ContractService} from '../services/contract.service';
import {Contract} from '../entities/contract';
import {Sort} from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  contracts$: Observable<Contract[]>;
  isLoading$: Observable<boolean>;
  // userSearch: string;
  // isAdmin$: Observable<boolean>;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor( private contractService: ContractService) {
  }

  ngOnInit() {
    this.isLoading$ = new Observable(subscriber => {
      subscriber.next(true);

      this.contracts$ = this.contractService.getContracts();

      setTimeout(() => {
        subscriber.next(false);
      }, 2000);
    });
  }
}
