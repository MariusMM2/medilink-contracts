import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contract } from '../entities/contract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private baseUrl = 'http://localhost:3000/api/contracts/';

  constructor( private http: HttpClient ) { }

  addContract(contract: Contract): Observable<any> {
    return this.http.post<Contract>(this.baseUrl + 'create', contract);
  }

  getContract(id: string): Observable<Contract> {
    return this.http.get<Contract>(this.baseUrl + `${id}`);
  }

  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.baseUrl);
  }

  updateContract(contract: Contract): Observable<any> {
    return this.http.put<Contract>(this.baseUrl + `${contract.id}`, contract);
  }

  deleteContract(id: string): Observable<any> {
    return this.http.delete<Contract>(this.baseUrl + `${id}`);
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
