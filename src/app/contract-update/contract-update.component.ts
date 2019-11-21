import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contract-update',
  templateUrl: './contract-update.component.html',
  styleUrls: ['./contract-update.component.css']
})
export class ContractUpdateComponent implements OnInit {

  contract: FormGroup;
  constructor(private snackBar: MatSnackBar, private fb: FormBuilder,
              private router: Router) {
    // , private productActions: ProductActions, private productService: ProductService) {
  }

  ngOnInit() {
    this.contract = this.fb.group({
      _id: [''],
      name: [''],
      description: [''],
      startDate: [''],
      expirationDate: [''],
      contractType: [''],
      contractFile: [''],
    });
  }

  updateContract() {
    console.log('TODO: Contract updated!');
    // let product = this.product.value as Product;
    //
    // this.productService.addProduct(product)
    //   .then(() => {
    //     console.log("product added!");
    //     this.product.reset();
    //     this.snackBar.open('Product added', "", {duration: 500}).afterDismissed().subscribe(() => {
    //       this.router.navigate(['../portal/product-list']);
    //     });
    //   });
  }

}
