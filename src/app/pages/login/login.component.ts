import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../shared/_services/users.service';
import { GlobalService } from '../../shared/_services/global.service';
import { StorageService } from '../../shared/_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  processing:boolean = false;
  errorMsg:string="";

  userInfo: { rollnumber:string, password: string} = {
    rollnumber : "",
    password : ""
  }

  loginForm = new FormGroup({
    rollnumber: new FormControl(this.userInfo.rollnumber, [
      Validators.required
    ]),
    password : new FormControl(this.userInfo.password, [
      Validators.required
    ])
  })

  constructor(
    private _userSerivce : UsersService,
    private _router : Router,
    private _globalService : GlobalService,
    private _storageService : StorageService
  ) { }

  ngOnInit() {
  }

  loginUser(){
    this.processing = true;
    console.log(this.userInfo);
    this._userSerivce.loginUser(this.userInfo).subscribe(
      (res) => {
        this.processing = false;
        console.log(res);
        StorageService.setItem('token', { token_type: res.token_type, token: res.access_token });
        this._globalService.setAccessToken({ token_type: res.token_type, token: res.access_token })
        this._userSerivce.isLoggedIn = true;
        this._router.navigate(['/instructions']);
      },
      error => {
        this.processing = false;
        console.log(error);
        this.errorMsg = error;
      }
    )
    // this.processing = true;
    // setTimeout( () => {
    //   this.processing = false;
    //   // this.errorMsg = "Unable to login";
    //   let data = {
    //     token : 'sdjsgdjs5454',
    //     name : 'John Doe',
    //     email : 'johndoe@gmail.com',
    //     contact : '987643210'
    //   }
    //   this._userSerivce.saveItem('user', data);
    //   this._userSerivce.isLoggedIn = true;
    //   this._router.navigate(['/instructions']);
    // },2000);
  }

}
