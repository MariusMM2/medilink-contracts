import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Contract} from '../entities/contract';
import {ContractService} from '../services/contract.service';

@Component({
  selector: 'app-contract-update',
  templateUrl: './contract-update.component.html',
  styleUrls: ['./contract-update.component.css']
})
export class ContractUpdateComponent implements OnInit {
  contract: Contract;
  contractForm: FormGroup;
  isLoading: boolean;

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private router: Router,
              private contractService: ContractService,
              private route: ActivatedRoute) {
  }


  async ngOnInit() {
    this.isLoading = true;
    this.contractForm = this.fb.group({
      id: [''],
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

    const id = this.route.snapshot.paramMap.get('id');
    this.contract = await this.contractService.getContract(id);

    this.isLoading = false;
  }

  clearErrorMessage() {
    document.getElementById('nameErrMsg').innerHTML = '';
  }

  async updateContract() {
    const contract = this.contractForm.value as Contract;

    if (this.contractForm.valid) {
      const backendRes = await this.contractService.updateContract(contract);
      console.log('backend response:', backendRes);

      if (backendRes.status === 200) {
        this.snackBar.open('Contract updated', '', {duration: 500}).afterDismissed().subscribe(() => {
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
