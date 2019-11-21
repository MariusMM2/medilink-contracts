import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {
  MatCheckboxModule,
  MatExpansionModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ContractComponent } from './contract/contract.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractCreateComponent } from './contract-create/contract-create.component';
import { ContractUpdateComponent } from './contract-update/contract-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContractComponent,
    ContractListComponent,
    ContractCreateComponent,
    ContractUpdateComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule, MatProgressBarModule, MatSelectModule, MatGridListModule, MatMenuModule, MatIconModule, MatToolbarModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatCardModule, MatDividerModule, MatExpansionModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
