import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { GameListComponent } from './game-list/game-list.component';
import { GameItemComponent } from './game-list/game-item/game-item.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameCreateComponent } from './game-create/game-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { ReviewCreateComponent } from './review-create/review-create.component';
@NgModule({
  declarations: [GameComponent, GameListComponent, GameItemComponent, GameDetailComponent, GameCreateComponent, ReviewCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpModule,
    NgbModule,
    GameRoutingModule
  ]
})
export class GameModule { }
