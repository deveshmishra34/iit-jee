import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { APIUrls } from '../APIUrls';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UsersService {

  // set on global service
  isLoggedIn:boolean = false;
  redirectUrl:string = '';

  constructor(
    private _http: Http
  ) {}

  loginUser(user:{rollnumber:string, password:string}){

    console.log(APIUrls.LOGIN);
    

    let body = {
      "username": "0123456789",
      "password": "password",
      "client_id": "system-admin",
      "client_secret": "KjPXuAVfC5xbmgreETNMaL7z",
      "grant_type": "password"
    }

    return this._http.post(APIUrls.LOGIN, body)
    .map((res) =>  res.json())
    .catch(this.handleErrors);
  }

  self() {
    return this._http.get(APIUrls.SELF)
    .map(res =>  res.json())
    .catch(this.handleErrors);
  }


  private handleErrors(error : Response | any){
    const errMsg = error.json();
    // console.log(errMsg);
    return Observable.throw(errMsg);
  }

  logout(){
    this.isLoggedIn = false;
  }

  // save user
  saveItem(item, user){
    localStorage.setItem(item, JSON.stringify(user));
  }
  // get user
  getItem(item){
    return localStorage.getItem(item);
  }
  // delete user
  deleteItem(item){
    localStorage.removeItem(item);
  }
}
