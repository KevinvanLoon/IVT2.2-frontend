import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn : boolean
  constructor(private authService : AuthService) { }

  ngOnInit() {
    
    if(this.authService.user == null || undefined) {
      this.loggedIn = false;
    }else {
      this.loggedIn = true
    }
    console.log(this.loggedIn)
    this.authService.loggedIn.subscribe((bool) => {
        this.loggedIn = bool;
        console.log(this.loggedIn)
    })
    
  }

  logout(){
    this.authService.logout();
  }

}
