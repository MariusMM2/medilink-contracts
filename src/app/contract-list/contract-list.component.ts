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
  sorted: Contract[];
  isLoading: boolean;
  contractSearch: string;
  // isAdmin$: Observable<boolean>;

  constructor(private contractService: ContractService, private azureService: AzureService) {
    this.contracts = [];
  }

  async ngOnInit() {
    if (this.azureService.authenticated) {
      this.getContracts();
    }
  }

  async connectOneDrive() {
    this.isLoading = true;

    await this.azureService.signIn();

    this.getContracts();
  }

  async refresh() {
    this.contracts.length = 0;
    this.isLoading = true;

    await this.contractService.syncContracts();

    this.getContracts();
  }

  private async getContracts() {
    this.isLoading = true;

    this.contracts = await this.contractService.getContracts();

    // this.sorted$ = contracts.sort((a, b) => (parseInt(a.cost) > parseInt(b.cost)) ? 1 : ((parseInt(b.cost) > parseInt(a.cost)) ? -1 : 0));
    this.sorted = this.contracts.sort((a, b) => (a.cost > b.cost) ? 1 : (b.cost > a.cost) ? -1 : 0);
    this.sorted.forEach((item) => item.location = addFlag(item.location));
    console.log('- this.sorted$ after sort', this.sorted);

    this.isLoading = false;
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
