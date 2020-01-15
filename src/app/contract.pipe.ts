import {Pipe, PipeTransform} from '@angular/core';
import {Contract} from './entities/contract';

@Pipe({
  name: 'contractPipe'
})
export class ContractPipe implements PipeTransform {

  transform(contracts: Contract[], search?: string): Set<Contract> {
    if (search === undefined || search === '') {
      return new Set(contracts);
    }

    const searchString = search.toLowerCase();

    const searchName = contracts.filter(
      contract => contract.name.toLowerCase().includes(searchString)
    );
    const searchDescription = contracts.filter(
      contract => contract.description.toLowerCase().includes(searchString)
    );
    const searchStartDate = contracts.filter(
      contract => contract.startDate.toString().includes(searchString)
    );
    const searchExpiration = contracts.filter(
      contract => contract.expirationDate.toString().includes(searchString)
    );
    const searchCategory = contracts.filter(
      contract => contract.category.toLowerCase().includes(searchString)
    );
    const searchCost = contracts.filter(
      contract => contract.cost.toString().includes(searchString)
    );
    const searchLocation = contracts.filter(
      contract => contract.location.toLowerCase().includes(searchString)
    );

    let searchResult: Contract[] = searchName.concat(searchDescription, searchStartDate, searchExpiration, searchCategory, searchCost, searchLocation);

    if (searchResult.length > 0) {
      return new Set(searchResult);
    } else {
      return new Set();
    }
  }
}
