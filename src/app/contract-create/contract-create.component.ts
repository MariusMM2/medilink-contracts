import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  contractForm: FormGroup;

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder,
              private router: Router, private contractService: ContractService) {
  }

  ngOnInit() {
    this.contractForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      description: ['', [Validators.required, Validators.maxLength(20)]],
      startDate: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      type: ['', [Validators.required, Validators.maxLength(20)]],
      file: ['', [Validators.required, Validators.maxLength(20)]],
      category: [''],
      cost: [''],
      location: [''],
    });
  }

  clearErrorMessage() {
    document.getElementById('nameErrMsg').innerHTML = '';
  }

  async saveContract() {
    console.log(this.contractForm);

    const contract = this.contractForm.value as Contract;
    console.log('contract: ', contract);

    if (this.contractForm.valid) {
      let backendRes = await this.contractService.addContract(contract);
      console.log('backend response:', backendRes);

      if (backendRes.status === 200) {
        this.snackBar.open('contract added', '', {duration: 500}).afterDismissed().subscribe(() => {
          this.router.navigate(['../dashboard/contract-list']);
        });
      } else if (backendRes.status === 400) {
        alert(backendRes.message);
      }
    } else {
      console.log('Invalid form!');
    }
  }
}
