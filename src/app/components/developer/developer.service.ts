import { AuthService } from './../../services/auth.service';
import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subject, from } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { environment } from 'src/environments/environment.prod';
import { Developer } from './developer.model'
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  developers: Developer[]
  developersAvailable = new BehaviorSubject<boolean>(false);
  developersChanged = new Subject<Developer[]>();
  constructor(
    private http: Http,
    private authService: AuthService
  ) { this.fetchDevelopers() }


  setXAccesToken(headers: Headers) {
    let token = this.authService.user.token;
    headers.append('X-Acces-Token', token);
  }

  fetchDevelopers() {
    let headers = new Headers();
    this.setXAccesToken(headers)
    this.http.get('https://gameapplicationapi.herokuapp.com/api/developer', { headers: headers })
      .map(response => response.json().map(data => new Developer(data.name, data.description, data.author._id)))
      .subscribe(
        (developers: Developer[]) => {
          this.setDevelopers(developers);
          this.developersAvailable.next(true)
        }
      )

  }

  setDevelopers(developers: Developer[]) {
    this.developers = developers;
    this.developersChanged.next(this.developers);
  }

  getDevelopers() {
    return this.developers;
  }

  getDeveloper(id: number): Developer {
    if (this.developers && id >= 0 && id < this.developers.length) {
      return JSON.parse(JSON.stringify(this.developers[id]))
    } else {
      return undefined;
    }
  }


  createNewDeveloper(developer: Developer) {
    let headers = new Headers();
    this.setXAccesToken(headers)

    return this.http.post(`https://gameapplicationapi.herokuapp.com/api/developer`,
      { name: developer.name, description: developer.description },
      { headers: headers })
      .do(result => {

        let d = new Developer(result.json().name, result.json().description, this.authService.user.id)
        this.developers.push(d);
        this.developersChanged.next(this.developers)

      })
  }

  deleteDeveloper(index: number) {
    let headers = new Headers();
    this.setXAccesToken(headers)
    const developer = this.developers[index]
    return this.http.delete(`https://gameapplicationapi.herokuapp.com/api/developer/${developer.name}`, { headers: headers })
      .do(result => {
        if (result.status == 200) {
          this.developers.splice(index, 1);
          this.developersChanged.next(this.developers);
          return true;
        } else {
          return false;
        }
      })

  }

  updateDeveloper(index: number, newDeveloper: Developer) {
    let headers = new Headers();
    this.setXAccesToken(headers)
    const developer = this.developers[index]
    return this.http.put(`https://gameapplicationapi.herokuapp.com/api/developer/${developer.name}`,
      { name: newDeveloper.name, description: newDeveloper.description },
      { headers: headers })
      .do(result => {
        if (result.status == 200) {
          this.developers[index] = newDeveloper;
          this.developersChanged.next(this.developers)
          return true;
        } else {
          return false;
        }
      })

  }
}
