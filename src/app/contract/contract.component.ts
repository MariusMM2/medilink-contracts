import {Component, Input, OnInit} from '@angular/core';
import {Contract} from '../entities/contract';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  @Input() productInput: Contract;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

}
