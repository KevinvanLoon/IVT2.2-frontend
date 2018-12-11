import { GuardService } from './services/guard.service';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent} from './components/dashboard/dashboard.component'

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent },
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full',canActivate: [GuardService] }
]
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
