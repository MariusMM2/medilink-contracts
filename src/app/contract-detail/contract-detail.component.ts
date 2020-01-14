import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ContractService} from '../services/contract.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Contract} from '../entities/contract';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {

  contract$: Observable<Contract>;
  isLoading$: Observable<boolean>;
  currentUser;
  // isAdmin$: Observable<boolean>;

  constructor(private snackBar: MatSnackBar, private contractService: ContractService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    this.isLoading$ = new Observable(subscriber => {
      subscriber.next(true);
      this.retrieveContract();

      setTimeout(() => {
        subscriber.next(false);
      }, 2000);
    });
  }

  async retrieveContract() {
    // Get the id from the url
    const id = this.route.snapshot.paramMap.get('id');
    const contract = await this.contractService.getContract(id) as Observable<Contract>;
    console.log('found matching contract:');
    console.log(contract);
    this.contract$ = contract;
  }

  deleteContract() {
    // Get the id from the url
    const id = this.route.snapshot.paramMap.get('id');
    this.contractService.deleteContract(id)
      .subscribe(backendRes => {
        console.log('backend response:', backendRes);

        if (backendRes.status === 200) {
          this.snackBar.open(`Contract ${id} has been deleted`, 'Dismiss', {duration: 2000}).afterDismissed().subscribe(() => {
            this.router.navigate(['../dashboard/contract-list']);
          });
        } else if (backendRes.status === 400) {

          alert(backendRes.message);

        }

      });
  }
}
