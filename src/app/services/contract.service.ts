import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contract, DriveContract} from '../entities/contract';
import {AzureService} from './azure.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private baseUrl = 'http://localhost:3000/api/contracts';

  constructor(private http: HttpClient, private azureService: AzureService) {
  }

  addContract(contract: Contract): Promise<any> {
    return this.http.post<Contract>(`${this.baseUrl}/create`, contract).toPromise();
  }

  async getContract(id: string): Promise<Contract> {
    const contract = await this.http.get<Contract>(`${this.baseUrl}/${id}`).toPromise();

    try {
      contract.driveRef = await this.azureService.getContract(contract.file);
    } catch (error) {
      console.log(`Could not get DriveItem with id '${contract.file}'`);
      console.log(JSON.stringify(error, null, 2));
    }

    return contract;
  }

  async getContracts(): Promise<Contract[]> {
    const contracts = await this.http.get<Contract[]>(this.baseUrl).toPromise();

    for (const contract of contracts) {
      try {
        contract.driveRef = await this.azureService.getContract(contract.file);
      } catch (error) {
        console.log(`Could not get DriveItem with id '${contract.file}'`);
        console.log(JSON.stringify(error, null, 2));
      }
    }

    return contracts;
  }

  async syncContracts(): Promise<any> {
    console.log('syncing contracts');
    const contracts: Contract[] = await this.http.get<Contract[]>(this.baseUrl).toPromise();
    const driveContracts: DriveContract[] = await this.azureService.getContracts();

    for (const driveContract of driveContracts) {
      let contract: Contract = contracts.find(value => value.file === driveContract.id);
      const isNewContract: boolean = contract === undefined;

      if (isNewContract) {
        contract = {
          id: undefined,
          name: driveContract.name,
          file: driveContract.id,
          description: '-',
          startDate: '',
          expirationDate: '',
          type: '-',
          category: '-',
          cost: 0,
          location: '-',
          userId: -1
        };
      }

      contract.name = driveContract.name;
      contract.description = driveContract.company;

      if (isNewContract) {
        console.log('adding contract: ', contract);
        await this.addContract(contract);
      } else {
        console.log('updating contract: ', contract);
        await this.updateContract(contract);
      }
    }
  }

  updateContract(contract: Contract): Promise<any> {
    return this.http.put<Contract>(`${this.baseUrl}/${contract.id}`, contract).toPromise();
  }

  deleteContract(id: string): Promise<any> {
    return this.http.delete<Contract>(`${this.baseUrl}/${id}`).toPromise();
  }

}
