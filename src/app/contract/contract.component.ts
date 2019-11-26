import {Component, Input, OnInit} from '@angular/core';
import {Contract} from '../entities/contract';
import {ContractService} from '../services/contract.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  @Input() contractInput: Contract;

  constructor() { }

  ngOnInit() {
  }

}
