import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {MsalService} from '@azure/msal-angular';
import {DriveContract} from '../entities/contract';
import {Client} from '@microsoft/microsoft-graph-client';

const API_BASE = '/me/drive';
const CONTRACTS_FOLDER = '9FA91B410245C428%21113';

@Injectable({
  providedIn: 'root'
})
export class AzureService {

  private graphClient: Client;
  public authenticated: boolean;
  public token: string;

  constructor(private msalService: MsalService) {
    this.authenticated = false;

    this.graphClient = Client.init({
      authProvider: async (done) => {
        const token = await this.getAccessToken()
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
    this.getAccessToken()
      .then(value => this.token = value)
      .catch(reason => this.token = undefined);
  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<void> {
    try {
      const result = await this.msalService.loginPopup(environment.azure.scopes);

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
      return await new Promise((resolve) => resolve(undefined));
    }
  }

  async getContracts(): Promise<DriveContract[]> {
    try {
      let result = await this.graphClient
        .api(`${API_BASE}/items/${CONTRACTS_FOLDER}/children`)
        .select('name,id,webUrl,folder,file')
        .get();

      const contracts: DriveContract[] = [];

      const folders: DriveFolder[] = result.value.filter(value => value.folder);

      console.log('contract folders:', folders);

      for (const folder of folders) {
        result = await this.graphClient
          .api(`${API_BASE}/items/${folder.id}/search(q='.pdf')`)
          .select('name,id,webUrl,folder,file')
          .get();

        const folderContracts: DriveContract[] = result.value.filter(value => value.file);

        for (const contract of folderContracts) {
          contract.company = folder.name;

          contracts.push(contract);
        }
      }

      console.log(contracts);

      return contracts.sort((a, b) => a.name.localeCompare(b.name));

    } catch (error) {
      console.error(error);
      console.error('Could not get contracts');
      console.error(JSON.stringify(error, null, 2));

      return null;
    }
  }

  async getContract(id: string): Promise<DriveContract> {
    try {
      const result = await this.graphClient
        .api(`${API_BASE}/items/${id}`)
        .get();

      const contract: DriveContract = {
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
