import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-releases', component: NewReleasesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}