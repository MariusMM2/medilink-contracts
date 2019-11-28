import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RecoveryPassComponent} from './recovery-pass/recovery-pass.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgotPassword', component: RecoveryPassComponent},

  {path: '**', component: PageNotFoundComponent}
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
