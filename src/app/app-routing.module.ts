import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ContractCreateComponent} from './contract-create/contract-create.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  // {path: '', redirectTo: 'home/login', pathMatch: 'full'},

  { path: 'home', component: HomeComponent, children: [
      // { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ]},

  { path: 'dashboard', component: DashboardComponent, children: [
      // { path: 'contract-list', component: ContractListComponent, canActivate: [AuthGuard] },
      // { path: 'contract-detail/:id', component:ContractDetailComponent, canActivate: [AuthGuard] },
      // { path: 'contract-update/:id', component:ContractUpdateComponent, canActivate: [AdminGuard] },
      // { path: 'contract-create', component: ContractCreateComponent, canActivate: [AdminGuard] },
      { path: 'contract-create', component: ContractCreateComponent},
    ]},

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
