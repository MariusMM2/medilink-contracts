import { Pipe, PipeTransform } from '@angular/core';
import {Contract} from './entities/contract';

@Pipe({
  name: 'contractPipe'
})
export class ContractPipe implements PipeTransform {

  // transform(value: any, ...args: any[]): any {
  //   return null;
  // }


  // transform(contracts: Contract[], search?: string): any {
  //   return contracts.filter(contract => {
  //     contract.name.toLowerCase().includes(search.toLowerCase());
  //     // contract.location.toLowerCase().includes(search.toLowerCase());
  //   });
  // }

  transform(contracts: Contract[], search?: string): any {
    console.log(contracts);

    // return contracts.filter(contract => {
    //   if (contract.name === undefined || contract.name !== search) {
    //     return false;
    //   }
    //   return true;
    // });

    // return contractsFilter;

    console.log(contracts);
    console.log(search);
    if (search === undefined) {
      return contracts;
    }


    const searchResult1 =  contracts.filter(
      contract => contract.name.toLowerCase().includes(search.toLowerCase())
    );
    const searchResult2 =  contracts.filter(
      contract => contract.location.toLowerCase().includes(search.toLowerCase())
    );
    const searchResult3 =  contracts.filter(
      contract => contract.category.toLowerCase().includes(search.toLowerCase())
    );
    const searchResult4 =  contracts.filter(
      contract => contract.expirationDate.toLowerCase().includes(search.toLowerCase())
    );
    const searchResult5 =  contracts.filter(
      contract => contract.startDate.toLowerCase().includes(search.toLowerCase())
    );

    console.log('searchResult1', searchResult1);


    if (searchResult1.length !== 0) {
      return searchResult1;
    } else if (searchResult2.length !== 0) {
      return searchResult2;
    } else if (searchResult3.length !== 0) {
      return searchResult3;
    } else if (searchResult4.length !== 0) {
      return searchResult4;
    } else if (searchResult5.length !== 0) {
      return searchResult5;
    }
    // return (searchResult && searchResult2);

    // return contracts.filter(
    //   contract => contract.name.toLowerCase().includes(search.toLowerCase())
    // );
  }
}
