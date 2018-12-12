import { MatSnackBar } from '@angular/material';
import { AuthService } from './../../../services/auth.service';
import { Game } from './../../game/game.model';
import { DeveloperService } from './../developer.service';
import { Developer } from './../developer.model';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, tap, switchMap } from 'rxjs/operators';
import { GameService } from '../../game/game.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-developer-detail',
  templateUrl: './developer-detail.component.html',
  styleUrls: ['./developer-detail.component.css']
})
export class DeveloperDetailComponent implements OnInit{


  developer: Developer;
  games: Game[]
  id: number;
  deleteSucceeded: boolean;
  errorMessage: string;
  gameSubscription: Subscription;
  userId: string;
  isAuthorized: boolean;

  constructor(
    private route: ActivatedRoute,
    private developerService: DeveloperService,
    private gameService: GameService,
    private authService: AuthService,
    private router: Router,
    public snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    
    this.userId = this.authService.user.id;
    this.route.params.pipe(
      filter(params => params['id']),
      filter(params => !!params),
      map(params => +params['id']),
      tap(id => this.id = id),
      switchMap(id => this.developerService.developersAvailable)
    ).subscribe((available) => {
      
      if(available){
        this.developer = this.developerService.getDeveloper(this.id)
        this.isAuthorized = (this.developer.authorId == this.userId)
        this.gameService.gamesAvailable.subscribe((ava) => {
          if (ava) {
            this.games = this.gameService.getGames().filter(g => g.developer.name == this.developer.name);
            this.gameSubscription = this.gameService.gamesChanged
            .subscribe(
              (games: Game[]) => {
                this.games = games.filter(g => g.developer.name == this.developer.name);
              }
            );
          }
      })
      
    }
  })
}

  onDeveloperDelete() {
  
      this.developerService.deleteDeveloper(this.id).subscribe(
        (res) => {
          this.deleteSucceeded = true;
          this.router.navigate(['/developers']);
        },
        (err) => {
          this.deleteSucceeded = false;
          const error = JSON.parse(err._body)
          const errormessage = error.error;
          const errors = JSON.stringify(error.error);
          
          this.snackBar.open(errors, 'close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          })
        }
      )
  }
};