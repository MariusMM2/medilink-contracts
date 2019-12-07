import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {ContractService} from '../services/contract.service';
import {Contract} from '../entities/contract';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import {MatSortModule} from '@angular/material/sort';


// export interface PeriodicElement {
//   name: string;
//   position: number;
//   description: string;
//   startDate: string;
//   endDate: string;
//   type: string;
//   file: string;
//   actions: string;
// }
//
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Contract 1', description: 'desc 1', startDate: '29.NOV.2019', endDate: '30.NOV.2019', type: 'company to company', file: 'file1.pdf', actions: 'delete' },
//   {position: 2, name: 'Contract 2', description: 'desc 2', startDate: '12.JUN.2019', endDate: '05.DEC.2019', type: 'company to employee', file: 'file2.pdf', actions: 'delete' },
//   {position: 3, name: 'Contract 3', description: 'desc 3', startDate: '13.JUN.2019', endDate: '03.DEC.2019', type: 'company to company', file: 'file3.pdf', actions: 'delete' },
//   {position: 4, name: 'Contract 4', description: 'desc 4', startDate: '14.JUN.2019', endDate: '08.DEC.2019', type: 'company to employee', file: 'file4.pdf', actions: 'delete' },
//   {position: 5, name: 'Contract 5', description: 'desc 5', startDate: '15.JUN.2019', endDate: '06.DEC.2019', type: 'company to employee', file: 'file5.pdf', actions: 'delete' },
//   {position: 6, name: 'Contract 6', description: 'desc 6', startDate: '16.JUN.2019', endDate: '09.DEC.2019', type: 'company to company', file: 'file6.pdf', actions: 'delete' },
// ];

export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

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

  desserts: Dessert[] = [
    {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
    {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
    {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6},
    {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4},
    {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4},
  ];

  sortedData: Dessert[];

  // displayedColumns: string[] = ['position', 'name', 'description', 'startDate', 'endDate', 'type', 'file', 'actions'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);


  constructor( private contractService: ContractService) {
    this.sortedData = this.desserts.slice();
  }

  // @ViewChild(MatSort, {static: true}) sort: MatSort;
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

  sortData(sort: Sort) {
    const data = this.desserts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'calories': return compare(a.calories, b.calories, isAsc);
        case 'fat': return compare(a.fat, b.fat, isAsc);
        case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      }
    });
  }

}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
