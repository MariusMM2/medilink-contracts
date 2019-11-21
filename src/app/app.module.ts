import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ContractComponent } from './contract/contract.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractCreateComponent } from './contract-create/contract-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContractComponent,
    ContractListComponent,
    ContractCreateComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
