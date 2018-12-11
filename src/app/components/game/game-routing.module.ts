import { ReviewCreateComponent } from './review-create/review-create.component';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from '../../services/guard.service';
import { GameComponent } from './game.component';

const routes: Routes = [
  {path: 'games', component: GameComponent,canActivate: [GuardService],  children: [
   //  {path: '', component: GameDetailComponent},
     {path: 'new', component: GameCreateComponent, canActivate: [GuardService]},
     {path: ':id/review/new', component: ReviewCreateComponent,canActivate: [GuardService]},
     {path: ':id/review/:reviewid/edit', component : ReviewCreateComponent,canActivate: [GuardService], data: { reviewAlreadyExists: true}},
     {path: ':id', component: GameDetailComponent,canActivate: [GuardService]},
     {path: ':id/edit', component: GameCreateComponent, canActivate: [GuardService], data: { userAlreadyExists: true}},
    // {path: ':id/edit', component: DeveloperCreateComponent, data: { userAlreadyExists: true}}
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
  export class GameRoutingModule { }