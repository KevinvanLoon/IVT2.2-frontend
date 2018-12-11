import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Game } from '../game.model';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games: Game[];
  subscription: Subscription;
  constructor(
    private router: Router,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.subscription = this.gameService.gamesChanged
    .subscribe(
      (games: Game[]) => {
        this.games = games;
      }
    );
    this.games = this.gameService.getGames();
  }

}
