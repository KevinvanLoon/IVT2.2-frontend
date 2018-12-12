import { Review } from './../review.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { DeveloperService } from './../../developer/developer.service';
import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.css']
})
export class ReviewCreateComponent implements OnInit {

  constructor(
    private gameService: GameService,
    private developerService: DeveloperService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  reviewForm: FormGroup;
  createSucceeded: boolean;
  responseMessage: string;
  gameIndex: number;
  editMode: boolean;
  reviewId: string;
  title: string;



  ngOnInit() {


    this.editMode = this.route.snapshot.data['reviewAlreadyExists'] || false;

    if (this.editMode) {
      this.title = "Edit review"
    } else { this.title = "Create review" }
    this.reviewForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'stars': new FormControl(null, [
        Validators.required,
        Validators.max(5),
        Validators.min(1),
        Validators.pattern("^[0-9]*$")])
    })
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.gameIndex = +params['id']
      }
      if (params['reviewid']) {
        this.reviewId = params['reviewid']
      }

      if (this.editMode) {
        console.log(this.gameIndex)
        this.gameService.gamesAvailable.subscribe((ava) => {
          if (ava) {
            let game = this.gameService.getGame(this.gameIndex);
            console.log(game)
            const review = game.reviews.filter(r => r._id == this.reviewId);

            if (review[0] != null) {
              this.reviewForm.setValue({
                title: review[0].title,
                stars: review[0].stars,
                description: review[0].description
              })
            }
          }

        })

      }
    })

  }

  onSubmit() {
    const title = this.reviewForm.value['title'];
    const description = this.reviewForm.value['description'];
    const stars = this.reviewForm.value['stars'];
    const authorId = this.authService.user.id;

    if (!this.editMode) {
      this.gameService.createReview(this.gameIndex, title, description, stars, authorId).subscribe(
        (res) => {
          this.createSucceeded = true;
          this.router.navigate([`/games/${this.gameIndex}`])
          console.log(res)
        },
        (err) => {
          this.createSucceeded = false;
          const error = JSON.parse(err._body)
          const errormessage = error.error;
          this.responseMessage = JSON.stringify(errormessage);
        })
    }
    else {
      this.gameService.updateReview(this.gameIndex, this.reviewId, title, description, stars, authorId).subscribe(
        (res) => {
          console.log('in res update')
          this.createSucceeded = true;
          this.router.navigate([`/games/${this.gameIndex}`])

        },
        (err) => {
          console.log('in res err')
          this.createSucceeded = false;
          const error = JSON.parse(err._body)
          const errormessage = error.error;
          this.responseMessage = JSON.stringify(errormessage);
        })
    }

  }
}
