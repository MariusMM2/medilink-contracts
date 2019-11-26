import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Contract} from '../entities/contract';
import {ContractService} from '../services/contract.service';

@Component({
  selector: 'app-contract-create',
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.css']
})
export class ContractCreateComponent implements OnInit {
  contract: FormGroup;
  constructor(private snackBar: MatSnackBar, private fb: FormBuilder,
              private router: Router, private contractService: ContractService) {
  }

  ngOnInit() {
    this.contract = this.fb.group({
      _id: [''],
      name: [''],
      description: [''],
      startDate: [''],
      expirationDate: [''],
      type: [''],
      file: [''],
    });
  }

  saveContract() {
    const contract = this.contract.value as Contract;

    this.contractService.addContract(contract)
      .then(() => {
        console.log('contract added!');
        this.contract.reset();
        this.snackBar.open('contract added', '', {duration: 500}).afterDismissed().subscribe(() => {
          this.router.navigate(['../dashboard/contract-list']);
        });
      });
  }
}
