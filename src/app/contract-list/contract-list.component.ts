import {Component, OnInit} from '@angular/core';
import {ContractService} from '../services/contract.service';
import {Contract} from '../entities/contract';
import {AzureService} from '../services/azure.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  contracts: Contract[];
  isLoading: boolean;
  // userSearch: string;
  // isAdmin$: Observable<boolean>;

  constructor(private contractService: ContractService, private azureService: AzureService) {
  }

  async ngOnInit() {
    if (this.azureService.authenticated) {
      await this.getContracts();
    }
  }

  async connectOneDrive() {
    await this.azureService.signIn();

    this.getContracts();
  }

  private async getContracts() {
    this.isLoading = true;

    this.contracts = await this.azureService.getContracts();

    this.isLoading = false;
  }
}
