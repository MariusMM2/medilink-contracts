import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  ngOnInit() {
    this.contractForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(15)]],
      description: ['', [Validators.required, Validators.maxLength(20)]],
      startDate: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      type: ['', [Validators.required, Validators.maxLength(20)]],
      file: ['', [Validators.required, Validators.maxLength(20)]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.contract = this.contractService.getContract(id);
  }

  clearErrorMessage() {
    document.getElementById('nameErrMsg').innerHTML = '';
  }

  updateContract() {
    const contract = this.contractForm.value as Contract;

    if (this.contractForm.valid) {
      this.contractService.updateContract(contract)
        .subscribe(backendRes => {
          console.log('backend response:', backendRes);

          if (backendRes.status === 200) {
            this.snackBar.open('Contract updated', '', {duration: 500}).afterDismissed().subscribe(() => {
              this.router.navigate(['../dashboard/contract-list']);
            });
          } else if (backendRes.status === 400) {

            // document.getElementById('nameErrMsg').innerHTML = backendRes.message + '<br><br>';
            alert(backendRes.message);

          }
        });

    } else {
      console.log('Invalid form!');
    }
  }

}
