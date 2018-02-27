import {Injectable} from '@angular/core';
import {BaseRequestOptions, RequestOptions} from '@angular/http';
import {GlobalService} from './global.service';

@Injectable()
export class DefaultRequestOptionsService extends BaseRequestOptions {

  constructor(private globalService: GlobalService) {
    super();
    // Set the default 'Content-Type' header
    this.headers.set('Content-Type', 'application/json');

    // Set User Token
    this.globalService.accessToken$.subscribe(
      value => {
        console.log(value);
        
        this.mapToken(value)
      }
    );
  }

  mapToken(data) {
    if (data) {
      this.headers.set('Authorization', data.token_type+' ' + data.token);
    }
  }
}

export const RequestOptionsProvider = {provide: RequestOptions, useClass: DefaultRequestOptionsService};
