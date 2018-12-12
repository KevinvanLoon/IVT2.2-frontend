import { AuthService } from './../../../services/auth.service';
import { DeveloperService } from './../developer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Developer } from '../developer.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-developer-create',
  templateUrl: './developer-create.component.html',
  styleUrls: ['./developer-create.component.css']
})
export class DeveloperCreateComponent implements OnInit {

  developerForm: FormGroup
  developer: Developer
  editMode: boolean
  id: number;

  createSucceeded: boolean;
  responseMessage: string;

  constructor(
    private authService:AuthService,
    private developerService: DeveloperService,
    private router: Router,
    private route: ActivatedRoute, ) {

  }
  ngOnInit() {
    this.editMode = this.route.snapshot.data['userAlreadyExists'] || false;
    this.developerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required])
    })
    if (this.editMode) {
      this.route.params.subscribe((params) => {
        if (params['id']) {
          this.developerService.developersAvailable.subscribe(developersAvailable => {
            if (developersAvailable) {
              this.id = +params['id'];
              this.developer = this.developerService.getDeveloper(this.id);
              if(this.developer != null) {
                this.developerForm.setValue({
                  name: this.developer.name,
                  description: this.developer.description
                })
              }
            }
          })
        }
      });
    }
  }

  onSubmit() {
    if (this.editMode) {
      let updatedDeveloper = new Developer(this.developerForm.value.name, this.developerForm.value.description,this.authService.user.id);
      this.developerService.updateDeveloper(this.id, updatedDeveloper).subscribe(
        (res) => {
          this.createSucceeded = true;
          this.router.navigate([`/developers`]);
        },
        (err) => {  
          const error = JSON.parse(err._body)
          const errormessage = error.error;
          this.responseMessage = JSON.stringify(errormessage);
          this.createSucceeded = false;
        }
      )
    } else {
      let newDeveloper = new Developer(this.developerForm.value.name, this.developerForm.value.description,this.authService.user.id);
      this.developerService.createNewDeveloper(newDeveloper).subscribe(
        (res) => {
          this.createSucceeded = true;
          this.router.navigate([`/developers`]);
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
