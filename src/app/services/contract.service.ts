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

    contract.driveRef = await this.azureService.getContract(contract.file);

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

  async syncContracts(): Promise<any> {
    console.log('syncing contracts');
    let contracts: Contract[] = await this.http.get<Contract[]>(this.baseUrl).toPromise();
    let driveContracts: DriveContract[] = await this.azureService.getContracts();

    for (let driveContract of driveContracts) {
      let contract: Contract = contracts.find(value => value.file === driveContract.id);
      let isNewContract: boolean = contract === undefined;

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


// import {Injectable} from '@angular/core';
// import {AngularFirestore} from '@angular/fire/firestore';
// import {Contract} from '../entities/contract';
// import {config} from '../app.config';
// import {Observable} from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ContractService {
//
//   constructor(private db: AngularFirestore) {
//   }
//
//   addContract(contract: Contract): Promise<void> {
//     const id = this.db.createId();
//     const contractDoc = this.getContractDoc(id);
//     contract._id = id;
//     console.log(contract);
//     return contractDoc.set(contract);
//   }
//
//   getContracts(): Observable<Contract[]> {
//     console.log('getContracts()');
//     return this.db
//       .collection(config.contracts_endpoint)
//       .valueChanges() as Observable<Contract[]>;
//   }
//
//   getContract(id: string): Observable<Contract> {
//     console.log('Retrieving contract with id ' + id);
//     const contractDoc = this.getContractDoc(id);
//     return contractDoc.valueChanges();
//   }
//
//   updateContract(contract: Contract): Promise<void> {
//     console.log('updating contract');
//     console.log(contract);
//     const contractDoc = this.getContractDoc(contract._id);
//     return contractDoc.update(contract);
//   }
//
//   deleteContract(id: string): Promise<void> {
//     // this.cartService.removeProduct(id);
//     return this.getContractDoc(id).delete();
//   }
//
//   private getContractDoc(id: string) {
//     return this.db.doc <Contract>(`${config.contracts_endpoint}/${id}`);
//   }
// }
