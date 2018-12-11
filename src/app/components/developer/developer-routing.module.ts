import { DeveloperListComponent } from './developer-list/developer-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeveloperDetailComponent } from './developer-detail/developer-detail.component';
import { DeveloperComponent } from './developer.component';
import { DeveloperCreateComponent } from './developer-create/developer-create.component';
import { GuardService } from '../../services/guard.service';

const routes: Routes = [
  {path: 'developers', component: DeveloperComponent, canActivate: [GuardService], children: [
   // {path: '', component: DeveloperDetailComponent},
    {path: 'new', component: DeveloperCreateComponent, canActivate: [GuardService]},
    {path: ':id', component: DeveloperDetailComponent, canActivate: [GuardService]},
    {path: ':id/edit', component: DeveloperCreateComponent, canActivate: [GuardService] , data: { userAlreadyExists: true}}
  ]}
];

@NgModule({
    imports: [
      // Always use forChild in child route modules!
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class DeveloperRoutingModule { }