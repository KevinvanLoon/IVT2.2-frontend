import { Review } from './review.model';
import { Developer } from './../developer/developer.model';
import { AuthService } from './../../services/auth.service';
import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subject, from } from 'rxjs';
import { map, tap, take, filter } from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { environment } from 'src/environments/environment.prod';
import { Game } from './game.model'
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  games: Game[]

  gamesAvailable = new BehaviorSubject<boolean>(false);
  gamesChanged = new Subject<Game[]>();
  constructor(
    private http: Http,
    private authService:AuthService
  ) { this.fetchGames() }


  setXAccesToken(headers: Headers) {
    let token = this.authService.user.token;
    headers.append('X-Acces-Token', token);
  }

  fetchGames() {
    let headers = new Headers();
    this.setXAccesToken(headers)
    this.http.get('https://gameapplicationapi.herokuapp.com/api/game', { headers: headers })
      .map(response => response.json().map(data => {
          let d = new Developer(data.developer.name, data.developer.description,data.developer.author._id);
          let g = new Game(data.title, data.description,d)
          let reviews = data.reviews;
          reviews.forEach(review => {
            g.reviews.push(review)
          });
          return g
        }))
      .subscribe(
        (games: Game[]) => {
          this.setGames(games);
          this.gamesAvailable.next(true)
        }
      )
  }

  setGames(games: Game[]) {
    this.games = games;
    this.gamesChanged.next(this.games);
  }

  getGames() {
      return this.games;
  }


  getGame(id: number): Game {
    if (this.games && id >= 0 && id < this.games.length) {
      return JSON.parse(JSON.stringify(this.games[id]))
    } else {
      return undefined;
    }
  }


  createNewGame(title : string, description : string, developerName: string) {
    let headers = new Headers();
    this.setXAccesToken(headers)
    return this.http.post(`https://gameapplicationapi.herokuapp.com/api/game`,
      { developer: developerName, description: description, title : title },
      { headers: headers })
      .do(result => {
          let d = new Developer(result.json().developer.name, result.json().developer.description,result.json().developer.author._id)
          let game = new Game(result.json().title, result.json().description, d);
          this.games.push(game);
          this.gamesChanged.next(this.games) 
      })
  }

  deleteGame(index: number){
    let headers = new Headers();
    this.setXAccesToken(headers)
    const game = this.games[index]
    return this.http.delete(`https://gameapplicationapi.herokuapp.com/api/game/${game.title}`, {headers : headers})
      .do(result => {
        if(result.status == 200){
          this.games.splice(index,1);
          this.gamesChanged.next(this.games);
          return true;
        }else {
          return false;
         }
      })

  }

  updateDeveloper(index:number,title:string,newTitle:string,description:string, developerName:string){
    let headers = new Headers();
    this.setXAccesToken(headers)
    return this.http.put(`https://gameapplicationapi.herokuapp.com/api/game/${title}`,
    {title: newTitle, description: description, developerName: developerName},
    {headers : headers})
    .do(result => {
      if(result.status == 200){
        let d = new Developer(result.json().developer.name, result.json().developer.description,this.authService.user.id)
        let game = new Game(result.json().title, result.json().description, d);
        this.games[index] = game;
        this.gamesChanged.next(this.games)
        return true;
      }else {
        return false;
       }
    })

  }

  createReview(gameIndex:number, title:string,description:string,stars:number,authorId:string){
    let headers = new Headers();
    this.setXAccesToken(headers)
    let game = this.games[gameIndex]
    return this.http.post(`https://gameapplicationapi.herokuapp.com/api/review/${game.title}`,
    {title : title, description : description, stars: stars},
    {headers : headers})
    .do(result => {
      if(result.status == 200){
          const reviews = result.json().reviews;
          const addedReview = reviews.filter(r => r.title == title)
          game.reviews.push(addedReview[0])
          this.games[gameIndex] = game;
          this.gamesChanged.next(this.games)
          return true
      }else {
        return false;
       }
    })
  }

  updateReview(gameIndex:number,id:string, title:string,description:string,stars:number,authorId:string){
    console.log('update')
    let headers = new Headers();
    this.setXAccesToken(headers)
    let game = this.games[gameIndex]
    return this.http.put(`https://gameapplicationapi.herokuapp.com/api/review/${id}`,
    {title : title, description : description, stars: stars},
    {headers : headers})
    .do(result => {
      if(result.status == 200){
          const reviews = result.json().reviews;
          
          game.reviews = reviews
          this.games[gameIndex] = game;
          this.gamesChanged.next(this.games)
          return true
      }else {
        return false;
       }
    })
  }

  deleteReview(gameIndex:number,id:string){
    console.log('inside review delete')
    let headers = new Headers();
    this.setXAccesToken(headers)
    let game = this.games[gameIndex]
    return this.http.delete(`https://gameapplicationapi.herokuapp.com/api/review/${id}`,
    {headers : headers})
    .do(result => {
      if(result.status == 200){
          const reviews = result.json().reviews;
          const reviewIndex = game.reviews.findIndex(function(i){
            return i._id == id
          })
          game.reviews.splice(reviewIndex,1)  
          this.games[gameIndex] = game;
          this.gamesChanged.next(this.games)
          return true
      }else {  
        return false;
       }
    })
  }
}
