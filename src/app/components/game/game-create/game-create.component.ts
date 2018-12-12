import { AuthService } from './../../../services/auth.service';
import { DeveloperService } from './../../developer/developer.service';
import { Developer } from './../../developer/developer.model';
import { Game } from './../game.model';
import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {

  constructor(
    private gameService: GameService,
    private developerService: DeveloperService,
    private authService : AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  gameForm: FormGroup;
  createSucceeded: boolean;
  responseMessage: string;
  editMode: boolean;
  id: number;
  game: Game
  developers: Developer[]

  ngOnInit() {
    this.editMode = this.route.snapshot.data['userAlreadyExists'] || false;
    this.gameForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'developer': new FormControl(null),
    })

    if (this.editMode) {
      this.route.params.subscribe((params) => {
        if (params['id']) {
          this.gameService.gamesAvailable.subscribe(developersAvailable => {
            if (developersAvailable) {
              this.id = +params['id'];
              this.game = this.gameService.getGame(this.id);
              console.log(this.game)
              if(this.game != null){
                this.gameForm.setValue({
                  title: this.game.title,
                  description: this.game.description,
                  developer: this.game.developer.name
                })
              } 
            }
          })
        }
      });
    }else {
      this.developerService.developersAvailable.subscribe((ava) => {      
        if(ava){
         
          this.developers = this.developerService.getDevelopers();
          
          this.developers = this.developers.filter(d => d.authorId == this.authService.user.id)
          this.developerService.developersChanged.subscribe((devs) =>{
            this.developers = devs.filter(d => d.authorId == this.authService.user.id);
           
         })
        }
      })
    }

  }

  onSubmit() {
    if (this.editMode) {
      const title = this.gameForm.value['title'];
      const description = this.gameForm.value['description'];
      const developer = this.gameForm.value['developer'];
      this.gameService.updateDeveloper(this.id,this.game.title,title, description, this.game.developer.name).subscribe(
        res => {
    
          this.createSucceeded = true;
          this.router.navigate([`/games`]);
        },
        (err) => {
  
          const error = JSON.parse(err._body)
          const errormessage = error.error;
          this.responseMessage = JSON.stringify(errormessage);
          this.createSucceeded = false;
        }
      )
    } else {
      const title = this.gameForm.value['title'];
      const description = this.gameForm.value['description'];
      const developer = this.gameForm.value['developer'];
      this.gameService.createNewGame(title, description, developer).subscribe(
        res => {
          this.createSucceeded = true;

        },
        (err) => {
          const error = JSON.parse(err._body)
          const errormessage = error.error;
          this.responseMessage = JSON.stringify(errormessage);
          this.createSucceeded = false;
        }
      )
    }


  }

}
