import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { APIUrls } from '../APIUrls';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InstructionsService{

    constructor(
        private _http : Http
    ){

    }

    genInstructions(){
        return this._http.get(APIUrls.GEN_INS)
        .map( res => res.json())
        .catch(this.errorHandler)
    }

    testInstructions() {
        return this._http.get(APIUrls.TEST_INS)
            .map(res => res.json())
            .catch(this.errorHandler)
    }

    private errorHandler(error: Response | any){
        var errorMsg = error.json();
        return Observable.throw(errorMsg);
    }
}