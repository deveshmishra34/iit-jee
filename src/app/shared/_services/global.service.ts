import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class GlobalService {
  public _loginStatus = new BehaviorSubject<boolean>(false);
  public _popupStatus = new BehaviorSubject<any>(null);
  public _user = new BehaviorSubject<any>({});
  private _routeParams = new BehaviorSubject<any>({});
  private _closeAllQuickView = new BehaviorSubject<boolean>(false);
  private _isDesktop = new BehaviorSubject<boolean>(window.screen.width > 600);
  public _accessToken: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('accessToken'));

  closeAllQuickView$ = this._closeAllQuickView.asObservable();
  user$ = this._user.asObservable();
  routeParams$ = this._routeParams.asObservable();
  popupStatus$ = this._popupStatus.asObservable();
  loginStatus$ = this._loginStatus.asObservable();
  accessToken$ = this._accessToken.asObservable();

  constructor() {}

  changeLoginStatus(value) {
    this._loginStatus.next(value);
  }
  setUser(value) {
    this._user.next(value);
  }
  changePopupStatus(value) {
    this._popupStatus.next(value);
  }
  changeRouteParams(value) {
    this._routeParams.next(value);
  }
  isDeviceDesktop(value) {
    this._isDesktop.next(value);
  }
  closeAllQuickView(value) {
    this._closeAllQuickView.next(value);
  }
  setAccessToken(accessToken) {
    this._accessToken.next(accessToken);
  }

}
