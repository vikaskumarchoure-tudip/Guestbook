import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map' ;

@Injectable()

export class RegisterService{

    constructor(private _http:Http){

    }

//registering the receptionist
    registerUser(regdata){
        //console.log(JSON.stringify(regdata));
        var headers = new Headers();
        headers.append("content-type","application/json");
        return this._http.post('api/v1/users_data',JSON.stringify(regdata),{headers:headers}).map(res => res.json());
    }
}