import { Review } from './../review.model';
import { AuthService } from './../../../services/auth.service';
import { GameService } from './../game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Game } from '../game.model';
import { filter, map, tap, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  game: Game;
  id: number;
  deleteSucces : boolean
  errorMessage : string
  isAuthorized : boolean
  currentUser : string

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private authService : AuthService,
    private router: Router
  ) { }

  ngOnInit() {
   
    this.route.params.pipe(
      filter(params => params['id']),
      filter(params=> !!params),
      map(params => +params['id']),
      // save id locally
      tap(id => this.id = id),
      tap(id => console.log(this.id)),
      // then wait for users to become available
      switchMap(id => this.gameService.gamesAvailable)
    ).subscribe((available) => 
    {
      if(available){
        this.game = this.gameService.getGame(this.id)
        this.isAuthorized = (this.game.developer.authorId == this.authService.user.id);
        this.currentUser = this.authService.user.id;
        this.gameService.gamesChanged.subscribe(() => {
            this.game = this.gameService.getGame(this.id)
        })
      }
    });
    
  }

  
  onGameDelete(){
    this.gameService.deleteGame(this.id).subscribe(
      (res) => {
        this.deleteSucces = true;
        this.router.navigate(['/games']);
      },
      (err) => {
        const error = JSON.parse(err._body)
        const errormessage = error.error;
        this.errorMessage = JSON.stringify(errormessage);
        this.deleteSucces = false;
        
      }
    )
  }

  onReviewDelete(review:Review){
    let reviewObject = <Review> review;
    let reviewid = reviewObject._id;
    
    this.gameService.deleteReview(this.id, reviewid).subscribe(
      (res) => {
        this.deleteSucces = true;
       
      },
      (err) => {

        const error = JSON.parse(err._body)
        const errormessage = error.error;
        this.errorMessage = JSON.stringify(errormessage);
        this.deleteSucces = false;
        
      }
    )
  }

}
