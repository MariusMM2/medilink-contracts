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
  isLoading$: Observable<boolean>;
  // userSearch: string;
  // isAdmin$: Observable<boolean>;

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
    // create an observable for the isAdmin field
    // this.isAdmin$ = this.ngRedux.select(state => state.products.isAdmin);
  }
}
