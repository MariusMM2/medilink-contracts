import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {ContractService} from '../services/contract.service';
import {Contract} from '../entities/contract';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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
export class ContractListComponent implements OnInit, AfterViewInit {
  contracts$: Observable<Contract[]>;
  isLoading$: Observable<boolean>;
  // userSearch: string;
  // isAdmin$: Observable<boolean>;

  dataSource
  ngOnInit() {

    // this.dataSource.sort = this.sort;

    this.isLoading$ = new Observable(subscriber => {
      subscriber.next(true);

      this.contracts$ = this.contractService.getContracts();

      setTimeout(() => {
        subscriber.next(false);
      }, 2000);
    });
  }

// <th mat-sort-header="name">name</th>-->
//   <!--      <th mat-sort-header="startDate">startDate</th>-->
//   <!--      <th mat-sort-header="expirationDate">expirationDate</th>-->
//   <!--      <th mat-sort-header="category">category</th>-->
//   <!--      <th mat-sort-header="cost">cost</th>-->
//   <!--      <th mat-sort-header="location">location</th>-->
//   <!--      <th mat-sort-header="actions">actions</th>-->
//
//   displayedColumns: string[] = ['name', 'startDate', 'expirationDate', 'category', 'cost', 'location'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  // dataSource = new MatTableDataSource(this.contracts$);

  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private contractService: ContractService) {
  }



  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.contracts$.sort = this.sort;
  }

}
