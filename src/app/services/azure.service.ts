import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {MsalService} from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class AzureService {

  public authenticated: boolean;
  public user: AzureUser;

  constructor(private msalService: MsalService) {
    this.authenticated = false;
    this.user = null;
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
      // Temporary placeholder
      this.user = new AzureUser();
      this.user.displayName = 'Adele Vance';
      this.user.email = 'AdeleV@contoso.com';
    }
  }

  // Sign out
  signOut(): void {
    this.msalService.logout();
    this.user = null;
    this.authenticated = false;
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    let result = await this.msalService.acquireTokenSilent(environment.azure.scopes)
      .catch((reason) => {
        console.log(reason);
      });

    // Temporary to display token in an error box
    if (result) {
      console.log('Token acquired');
      console.log(result);
    }
    return result;
  }
}

class AzureUser {
  public displayName: string;
  public email: string;
}
