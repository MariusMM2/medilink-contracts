import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ContractService} from '../services/contract.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Contract} from '../entities/contract';
import {AzureService} from '../services/azure.service';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {

  contract: Contract;
  isLoading: boolean;
  currentUser;

  constructor(private snackBar: MatSnackBar, private contractService: ContractService, private azureService: AzureService,
              private router: Router, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    if (this.azureService.authenticated) {
      this.isLoading = true;

      const id = this.route.snapshot.paramMap.get('id');

      this.contract = await this.contractService.getContract(id);

      console.log('contract:', this.contract);

      this.isLoading = false;
    } else {
      await this.router.navigate(['../dashboard/contract-list'], {replaceUrl: true});
    }
  }

  async deleteContract() {
    // Get the id from the url
    const id = this.route.snapshot.paramMap.get('id');
    let backendRes = await this.contractService.deleteContract(id);
    console.log('backend response:', backendRes);

    if (backendRes.status === 200) {
      this.snackBar.open(`Contract ${id} has been deleted`, 'Dismiss', {duration: 2000}).afterDismissed().subscribe(() => {
        this.router.navigate(['../dashboard/contract-list']);
      });
    } else if (backendRes.status === 400) {
      alert(backendRes.message);
    }
  }
}
