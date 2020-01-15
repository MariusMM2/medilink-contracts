import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contract, DriveContract} from '../entities/contract';
import {AzureService} from './azure.service';

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
    let contract = await this.http.get<Contract>(`${this.baseUrl}/${id}`).toPromise();

    try {
      contract.driveRef = await this.azureService.getContract(contract.file);
    } catch (error) {
      console.log(`Could not get DriveItem with id '${contract.file}'`);
      console.log(JSON.stringify(error, null, 2));
    }

    return contract;
  }

  async getContracts(): Promise<Contract[]> {
    let contracts = await this.http.get<Contract[]>(this.baseUrl).toPromise();

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

  /**
   * Synchronise the server-side database with the OneDrive folder
   */
  async syncContracts(): Promise<any> {
    let dbContracts: Contract[] = await this.http.get<Contract[]>(this.baseUrl).toPromise();
    let driveContracts: DriveContract[] = await this.azureService.getContracts();

    for (let driveContract of driveContracts) {
      let dbContract: Contract = dbContracts.find(
        contract => contract.file === driveContract.id);
      const isNewContract: boolean = dbContract === undefined;

      if (isNewContract)
        // Create a new Contract object with default fields
      {
        dbContract = {
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

      const isModified: boolean = dbContract.name !== driveContract.name ||
        dbContract.description !== driveContract.company;

      dbContract.name = driveContract.name;
      dbContract.description = driveContract.company;

      if (isNewContract) {
        await this.addContract(dbContract);
      } else {
        if (isModified) {
          await this.updateContract(dbContract);
        }
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
