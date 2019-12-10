import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ContractService} from '../services/contract.service';
import {Contract} from '../entities/contract';
import {AzureService} from '../services/azure.service';

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

  constructor(private contractService: ContractService, private azureService: AzureService) {
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

  async loginAzure() {
    await this.azureService.signIn();
  }
}
