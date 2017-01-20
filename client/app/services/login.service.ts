import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map' ;

@Injectable()

export class LoginService{

    constructor(private _http:Http){

    }

    checkLogin(todos){
        var headers = new Headers();
        headers.append("content-type","application/json");

        return this._http.post('api/v1/find_data',JSON.stringify(todos),{headers:headers}).map(res => res.json());
    }

}