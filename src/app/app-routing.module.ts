import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ContractCreateComponent} from './contract-create/contract-create.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home/home.component';
import {ContractListComponent} from './contract-list/contract-list.component';
import {RegisterComponent} from './register/register.component';
import {ContractUpdateComponent} from './contract-update/contract-update.component';
import {ContractDetailComponent} from './contract-detail/contract-detail.component';
import {AuthGuard} from './auth/auth.guard';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {ProfileComponent} from './profile/profile.component';
import {AdminChangeRoleComponent} from './admin-change-role/admin-change-role.component';
import {AdminGuard} from './admin/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home/login', pathMatch: 'full'},

  {
    path: 'home', component: HomeComponent, children: [
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
    ]
  },

  {
    // path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    //   {path: 'contract-list', component: ContractListComponent, canActivate: [AuthGuard]},
    //   {path: 'contract-create', component: ContractCreateComponent, canActivate: [AuthGuard]},
    //   {path: 'contract-detail/:id', component: ContractDetailComponent, canActivate: [AuthGuard]},
    //   {path: 'contract-update/:id', component: ContractUpdateComponent, canActivate: [AuthGuard]},
    //   {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
    //   {path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
    //   {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard]},
    //   {path: 'admin-change-role/:id', component: AdminChangeRoleComponent, canActivate: [AuthGuard]},
    // ]

    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {path: 'contract-list', component: ContractListComponent},
      {path: 'contract-create', component: ContractCreateComponent},
      {path: 'contract-detail/:id', component: ContractDetailComponent},
      {path: 'contract-update/:id', component: ContractUpdateComponent},
      {path: 'statistics', component: StatisticsComponent},
      {path: 'profile/:id', component: ProfileComponent},
      {path: 'admin-panel', component: AdminPanelComponent},
      {path: 'admin-change-role/:id', component: AdminChangeRoleComponent},
    ]
    // path: 'dashboard', component: DashboardComponent, children: [
    //   {path: 'contract-list', component: ContractListComponent /*, canActivate: [AuthGuard]*/ },
    //   {path: 'contract-create', component: ContractCreateComponent /*, canActivate: [AuthGuard]*/},
    //   {path: 'contract-detail/:id', component: ContractDetailComponent /*, canActivate: [AuthGuard]*/},
    //   {path: 'contract-update/:id', component: ContractUpdateComponent /*, canActivate: [AuthGuard]*/},
    //   {path: 'statistics', component: StatisticsComponent /*, canActivate: [AuthGuard]*/},
    //   {path: 'profile/:id', component: ProfileComponent /*, canActivate: [AuthGuard]*/},
    //   {path: 'admin-panel', component: AdminPanelComponent /*, canActivate: [AuthGuard]*/},
    //   {path: 'admin-change-role/:id', component: AdminChangeRoleComponent /*, canActivate: [AuthGuard]*/},
    // ]
  },

  {path: '**', component: PageNotFoundComponent},
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
