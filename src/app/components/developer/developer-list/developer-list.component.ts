import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Developer } from '../developer.model';
import { DeveloperService } from '../developer.service';
import { Subscription } from 'rxjs';
import {MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.css']
})
export class DeveloperListComponent implements OnInit {

  developers: Developer[];
  subscription: Subscription;
  displayedColumns: string[] = ['index','name'];
  constructor(
    private router: Router,
    private developerService: DeveloperService
  ) { }

  ngOnInit() {
    this.subscription = this.developerService.developersChanged
    .subscribe(
      (developers: Developer[]) => {
        this.developers = developers;
      }
    );
    this.developers = this.developerService.getDevelopers();
    
  }



}
