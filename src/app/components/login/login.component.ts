import { AuthService } from './../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  loginForm: FormGroup;
  loginInvalid = false;
  responseMessage : string;

  onSubmit() {
    const username = this.loginForm.value['username'];
    const password = this.loginForm.value['password'];

    this.authService.login(username, password).subscribe ( 
      (res) => {
        this.router.navigate(['/developers'])
        this.loginInvalid = false;
      },
      (err) => {
        this.responseMessage = JSON.stringify(err.error.error);
        this.loginInvalid = true;
      }
    )
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, 
        [Validators.required]),
      'password': new FormControl(null, 
        [Validators.required]),
    });
    this.authService.logout();
  }

  getUsernameErrorMessage() {
    this.loginForm.get('username').hasError('required') ? 'You must enter a value' :
            '';
  }

  getPasswordErrorMessage() {
    this.loginForm.get('password').hasError('required') ? 'You must enter a value' :
            '';
  }

}
