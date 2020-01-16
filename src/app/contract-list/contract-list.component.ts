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
  currentUser;

  constructor(private contractService: ContractService, private azureService: AzureService) {
    this.contracts = [];
  }

  async ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user;

    this.getContracts();
  }

  async refresh() {
    this.contracts.length = 0;
    this.isLoading = true;


    if (await this.azureService.getAccessToken() === undefined) {
      await this.azureService.signIn();
    }
    await this.contractService.syncContracts();

    this.getContracts();
  }

  private async getContracts() {
    this.isLoading = true;

    this.contracts = await this.contractService.getContracts();

    // tslint:disable-next-line:radix max-line-length
    this.sorted = this.contracts.sort((a, b) => (parseInt(String(a.cost), 10) > parseInt(String(b.cost), 10)) ? 1 : ((parseInt(String(b.cost), 10) > parseInt(String(a.cost), 10)) ? -1 : 0));
    this.sorted.forEach((item) => item.location = addFlag(item.location));
    console.log('- this.sorted$ after sort', this.sorted);

    this.isLoading = false;
  }
}

function addFlag(myCountry: string) {
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
    if (myCountry.toLowerCase().includes(flagDb[i].country.toLowerCase())) {
      return myCountry + ' - ' + flagDb[i].flag;
    }
  }
  return myCountry;
}
