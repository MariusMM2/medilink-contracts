import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Contract} from '../entities/contract';
import {ContractService} from '../services/contract.service';

@Component({
  selector: 'app-contract-update',
  templateUrl: './contract-update.component.html',
  styleUrls: ['./contract-update.component.css']
})
export class ContractUpdateComponent implements OnInit {
  contract: Observable<Contract>;
  contractForm: FormGroup;

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private router: Router,
              private contractService: ContractService,
              private route: ActivatedRoute) {
  }

  updateContract() {
    const contract = this.contractForm.value as Contract;

    this.contractService.updateContract(contract)
      .then(() => {
        console.log('contract updated!');
        this.snackBar.open('Contract updated', '', {duration: 500}).afterDismissed().subscribe(() => {
          this.router.navigate(['../dashboard/contract-list']);
        });
      });
  }

  ngOnInit() {
    this.contractForm = this.fb.group({
      _id: [''],
      name: [''],
      description: [''],
      startDate: [''],
      expirationDate: [''],
      type: [''],
      file: [''],
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.contract = this.contractService.getContract(id);
  }
}
