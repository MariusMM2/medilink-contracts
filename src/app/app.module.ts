import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ContractComponent } from './contract/contract.component';
import { ContractListComponent } from './contract-list/contract-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContractComponent,
    ContractListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
