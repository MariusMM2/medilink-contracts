import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {MsalService} from '@azure/msal-angular';
import {Contract} from '../entities/contract';
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

  async getContracts(): Promise<Contract[]> {
    try {
      let result = await this.graphClient
        .api(`${API_BASE}/items/${CONTRACTS_FOLDER}/search(q='${FILTER_STRING}')`)
        .select('name,id,webUrl,createdDateTime')
        .orderby('name ASC')
        .get();

      return result.value;
    } catch (error) {
      console.log('Could not get contracts');
      console.log(JSON.stringify(error, null, 2));
    }
  }

  async getContract(id: string): Promise<Contract> {
    try {
      return await this.graphClient
        .api(`${API_BASE}/items/${id}`)
        .select('name,id,webUrl,createdDateTime')
        .get();
    } catch (error) {
      console.log(`Could not get contract with id '${id}'`);
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
