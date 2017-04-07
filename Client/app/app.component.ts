import { Component, ChangeDetectorRef } from '@angular/core';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import { MyHttpService } from './myhttp.service';
import { Router }   from '@angular/router';

declare var Auth0Lock; 

@Component({
  selector: 'my-app',
  templateUrl: '../app/htmlpage/app.component.html',
  styleUrls: ['../app/stylefiles/app.component.css']
})
export class AppComponent {
  lock = new Auth0Lock("B8j2pPjGOFqeyQvOwA3DPXu2xcgsMuJN", "arturik.auth0.com");
  jwtHelper: JwtHelper = new JwtHelper();
  
  constructor(private myHttpService: MyHttpService, private ref: ChangeDetectorRef, private router: Router) {
    ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 100);
  }

  login(){
    var self = this;
    this.lock.show((err: string, profile: string, id_token: string)=>{
      if(err){
        throw new Error(err);
      }
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);
      this.myHttpService.authMetod(
        JSON.parse(localStorage.getItem('profile')).user_id, 
        JSON.parse(localStorage.getItem('profile')).email
      );
      console.log(
        this.jwtHelper.decodeToken(id_token),
        this.jwtHelper.getTokenExpirationDate(id_token),
        this.jwtHelper.isTokenExpired(id_token)
      );
      
    });
    
  }

  logout(){
    var self = this;
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.router.navigate(['/doing']);
  }

  loggedIn(){
    return tokenNotExpired();
  }
/*  
  addUser(id_param: string, user_name: string) {
    let body = JSON.stringify({ id: id_param, name: user_name });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8888/user/loginUser', body, options)
      .subscribe();
  }
*/
}

