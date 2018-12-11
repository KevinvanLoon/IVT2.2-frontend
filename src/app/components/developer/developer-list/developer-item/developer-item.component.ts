import { Developer } from './../../developer.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-developer-item]',
  templateUrl: './developer-item.component.html',
  styleUrls: ['./developer-item.component.css']
})
export class DeveloperItemComponent implements OnInit {

  @Input() selectedDeveloper: Developer;
  @Input() index: number;


  constructor() { }

  ngOnInit() {
    
  }

}
