import {Component, OnInit} from '@angular/core';
import {Contract} from '../entities/contract';
import {ContractService} from '../services/contract.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  contracts: Contract[];
  isLoading: boolean;
  statisticsDateCurrent = 0;
  statisticsDateExpired = 0;
  statisticsDateNotStarted = 0;

  constructor(private contractService: ContractService) {
  }

  async ngOnInit() {
    this.isLoading = true;

    this.contracts = await this.contractService.getContracts();

    this.generateDateStatistics();
    this.generateCostStatistics();

    this.isLoading = false;
  }

  private generateDateStatistics() {
    const currentDate = this.formatDate(new Date());
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.contracts.length; i++) {
      const startDate = this.formatDate(this.contracts[i].startDate);
      const expirationDate = this.formatDate(this.contracts[i].expirationDate);
      if (currentDate >= startDate && currentDate <= expirationDate) {
        this.statisticsDateCurrent++;
      }

      if (currentDate > expirationDate) {
        this.statisticsDateExpired++;
      }

      if (currentDate < startDate) {
        this.statisticsDateNotStarted++;
      }
    }
  }

  private generateCostStatistics() {
    // tslint:disable-next-line:max-line-length radix
    this.contracts = this.contracts.sort((a, b) => (parseInt(String(a.cost)) > parseInt(String(b.cost))) ? 1 : ((parseInt(String(b.cost)) > parseInt(String(a.cost))) ? -1 : 0));
  }

  formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }
}
