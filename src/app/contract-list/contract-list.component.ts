import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ContractService} from '../services/contract.service';
import {Contract} from '../entities/contract';

export interface PeriodicElement {
  name: string;
  position: number;
  description: string;
  startDate: string;
  endDate: string;
  type: string;
  file: string;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Contract 1', description: 'desc 1', startDate: '29.NOV.2019', endDate: '30.NOV.2019', type: 'company to company', file: 'file1.pdf', actions: 'delete' },
  {position: 2, name: 'Contract 2', description: 'desc 2', startDate: '12.JUN.2019', endDate: '05.DEC.2019', type: 'company to employee', file: 'file2.pdf', actions: 'delete' },
  {position: 3, name: 'Contract 3', description: 'desc 3', startDate: '13.JUN.2019', endDate: '03.DEC.2019', type: 'company to company', file: 'file3.pdf', actions: 'delete' },
  {position: 4, name: 'Contract 4', description: 'desc 4', startDate: '14.JUN.2019', endDate: '08.DEC.2019', type: 'company to employee', file: 'file4.pdf', actions: 'delete' },
  {position: 5, name: 'Contract 5', description: 'desc 5', startDate: '15.JUN.2019', endDate: '06.DEC.2019', type: 'company to employee', file: 'file5.pdf', actions: 'delete' },
  {position: 6, name: 'Contract 6', description: 'desc 6', startDate: '16.JUN.2019', endDate: '09.DEC.2019', type: 'company to company', file: 'file6.pdf', actions: 'delete' },
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

  displayedColumns: string[] = ['position', 'name', 'description', 'startDate', 'endDate', 'type', 'file', 'actions'];
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
