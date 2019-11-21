import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-contract-create',
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.css']
})
export class ContractCreateComponent implements OnInit {
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
      price: []
    });
  }

  saveContract() {
    console.log('TODO: Contract saved!');
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
