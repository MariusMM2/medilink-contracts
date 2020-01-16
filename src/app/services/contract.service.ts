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
    const contract = await this.http.get<Contract>(`${this.baseUrl}/${id}`).toPromise();

    try {
      const driveRef = await this.azureService.getContract(contract.file);
      if (driveRef !== null) {
        contract.driveRef = driveRef;
      }
    } catch (error) {
      console.error(error);
      console.error(`Could not get DriveItem with id '${contract.file}'`);
      console.error(JSON.stringify(error, null, 2));
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

  /**
   * Synchronise the server-side database with the OneDrive folder
   */
  async syncContracts(): Promise<any> {
    const dbContracts: Contract[] = await this.http.get<Contract[]>(this.baseUrl).toPromise();
    const driveContracts: DriveContract[] = await this.azureService.getContracts();

    for (const driveContract of driveContracts) {
      let dbContract: Contract = dbContracts.find(
        contract => contract.file === driveContract.id);
      const isNewContract: boolean = dbContract === undefined;

      if (isNewContract) {
        // Create a new Contract object with default fields
        dbContract = {
          id: undefined,
          name: driveContract.name,
          file: driveContract.id,
          description: '-',
          startDate: new Date(1970, 0, 1),
          expirationDate: new Date(1970, 0, 1),
          type: '-',
          category: '-',
          cost: 0,
          location: '-'
        };
      }

      if (isNewContract) {
        await this.addContract(dbContract);
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
