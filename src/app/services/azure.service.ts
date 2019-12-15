import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {MsalService} from '@azure/msal-angular';
import {Contract} from '../entities/contract';
import {Client} from '@microsoft/microsoft-graph-client';

@Injectable({
  providedIn: 'root'
})
export class AzureService {

  private graphClient: Client;
  private contractsFolderId = 'A0526EA1F25CC85E!106526';
  public authenticated: boolean;
  private filterString: any = 'pdf';

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
    let result = await this.msalService.loginPopup(environment.azure.scopes)
      .catch((reason) => {
        console.log('Login failed');
        console.log(JSON.stringify(reason, null, 2));
      });

    if (result) {
      this.authenticated = true;
    }
  }

  // Sign out
  signOut(): void {
    this.msalService.logout();
    this.authenticated = false;
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    let result = await this.msalService.acquireTokenSilent(environment.azure.scopes)
      .catch((reason) => {
        console.log(JSON.stringify(reason, null, 2));
      });

    // Temporary to display token in an error box
    if (result) {
      console.log('Token acquired');
      console.log(result);
    }
    return result;
  }

  async getContracts(): Promise<Contract[]> {
    try {
      // let result = await this.graphClient
      //   .api('/me/drive/root/search')
      //   .search('pdf')
      //   .select('name,id,webUrl')
      //   .orderby('name ASC')
      //   .get();
      let [result] = await Promise.all([this.graphClient
        .api(`/me/drive/items/${this.contractsFolderId}/search(q='${this.filterString}')`)
        .select('name,id,webUrl,createdDateTime')
        .orderby('name ASC')
        .get()]);

      return result.value;
    } catch (error) {
      console.log('Could not get contracts');
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
