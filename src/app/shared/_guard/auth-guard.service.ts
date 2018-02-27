import { Injectable } from '@angular/core';
import { 
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
 } from '@angular/router';

 import { UsersService } from '../_services/users.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private _router : Router,
    private _userService: UsersService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canLoad(route: Route){
    console.log(route.path );
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  checkLogin(url:string){
    if (this._userService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this._userService.redirectUrl = url;

    // Create a dummy session id
    let sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    };

    // Navigate to the login page with extras
    this._router.navigate(['/login'], navigationExtras);
    return false;
  }

}
