import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {MsalService} from '@azure/msal-angular';
import {DriveContract} from '../entities/contract';
import {Client} from '@microsoft/microsoft-graph-client';

const API_BASE = '/me/drive';
const CONTRACTS_FOLDER = 'A0526EA1F25CC85E!106526';
const FILTER_STRING = 'pdf';

@Injectable({
  providedIn: 'root'
})
export class AzureService {

  private graphClient: Client;
  public authenticated: boolean;

  constructor(private msalService: MsalService) {
    this.authenticated = false;

    this.graphClient = Client.init({
      authProvider: async (done) => {
        let token = await this.getAccessToken()
          .catch(reason => {
            done(reason, null);
          });

        if (token) {
          done(null, token);
        } else {
          done('Could not get access token', null);
        }
      }
    });
  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<void> {
    try {
      let result = await this.msalService.loginPopup(environment.azure.scopes);

      if (result) {
        this.authenticated = true;
      }
      return result;
    } catch (error) {
      console.log('Login failed');
      console.log(JSON.stringify(error, null, 2));
    }
  }

  // Sign out
  signOut(): void {
    this.msalService.logout();
    this.authenticated = false;
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    try {
      return await this.msalService.acquireTokenSilent(environment.azure.scopes);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }

  async getContracts(): Promise<DriveContract[]> {
    try {
      let result = await this.graphClient
        .api(`${API_BASE}/items/${CONTRACTS_FOLDER}/children`)
        .select('name,id,webUrl,folder,file')
        .get();

      let contracts: DriveContract[] = [];

      let folders: DriveFolder[] = result.value.filter(value => value.folder);

      console.log(folders);

      for (const folder of folders) {
        result = await this.graphClient
          .api(`${API_BASE}/items/${(folder.id)}/search(q='${FILTER_STRING}')`)
          .select('name,id,webUrl,folder,file')
          .get();

        let folderContracts: DriveContract[] = result.value.filter(value => value.file);

        for (const contract of folderContracts) {
          contract.company = folder.name;

          contracts.push(contract);
        }
      }

      console.log(contracts);

      return contracts.sort((a, b) => a.name.localeCompare(b.name));

    } catch (error) {
      console.error(error);
      console.log('Could not get contracts');
      console.log(JSON.stringify(error, null, 2));
    }
  }

  async getContract(id: string): Promise<DriveContract> {
    if (id.length !== CONTRACTS_FOLDER.length) {
      return new Promise((resolve, reject) => {
        reject(Error(`Invalid DriveItem ID (${id})`));
      });
    }
    try {
      let result = await this.graphClient
        .api(`${API_BASE}/items/${id}`)
        .get();

      let contract: DriveContract = {
        id: result.id,
        name: result.name,
        company: result.parentReference.name,
        webUrl: result.webUrl,
        downloadUrl: result['@microsoft.graph.downloadUrl']
      };

      contract.company = result.parentReference.name;

      return contract;
    } catch (error) {
      console.log(`Could not get contract with id '${id}'`);
      console.log(JSON.stringify(error, null, 2));
      return null;
    }
  }
}

class DriveFolder {
  id: string;
  name: string;
  webUrl: string;
}
