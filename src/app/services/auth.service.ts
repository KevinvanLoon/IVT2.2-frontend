import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })
  
export class AuthService {

    readonly url = 'https://gameapplicationapi.herokuapp.com/login';
    loggedIn = new Subject<boolean>();
    constructor(private httpClient: HttpClient) { }

    login(username:string,password:string):Observable<any> {

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let body = { 'username': username, 'password': password}
        return this.httpClient.post<any>
        (this.url,body,{headers: headers})
        .pipe(
            map(result => {
                const user: User = new User(result.username,result.token,result._id)
                localStorage.setItem('currentUser', JSON.stringify(user))
                this.loggedIn.next(true)
                return true
            })
        )
    }

    get user(): User {
        const user: User = JSON.parse( localStorage.getItem('currentUser') );
        return user;
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.loggedIn.next(false)
    }


}
