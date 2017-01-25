import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class EditVisitor{

    constructor(private _http: Http){}

/*
editSavedDatas(visitor_edit) {
        var headers = new Headers();
        headers.append("content-type", "application/json");        
        return this._http.post('api/v1/visitor_edit',JSON.stringify(visitor_edit), {headers: headers}).map(res=>res.json());
    }
 */

    editVisitor(visitor_data){
        var headers = new Headers();
        headers.append("content-type", "application/json");
        console.log("It reached here...");
        return this._http.post('edit_data/visitor_edit',JSON.stringify(visitor_data),{headers : headers})
        .map(res => res.json());
    }

}