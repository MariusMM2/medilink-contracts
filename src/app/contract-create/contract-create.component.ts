import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-contract-create',
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.css']
})
export class ContractCreateComponent implements OnInit {
  contract: FormGroup;

  constructor() { }

  ngOnInit() {
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
