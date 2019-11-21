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
  MatProgressBarModule, MatProgressSpinnerModule,
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContractComponent,
    ContractListComponent,
    ContractCreateComponent,
    ContractUpdateComponent,
    PageNotFoundComponent,
    ContractDetailComponent,
    DashboardComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule, MatProgressBarModule, MatSelectModule, MatGridListModule, MatMenuModule, MatIconModule, MatToolbarModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatCardModule, MatDividerModule, MatExpansionModule,
    MatCheckboxModule,
    BrowserModule,
    ReactiveFormsModule, FormsModule, MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
