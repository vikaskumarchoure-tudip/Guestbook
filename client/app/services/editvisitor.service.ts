import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class EditVisitor{

    constructor(private _http: Http){}

    editVisitor(visitor_data){
        var headers = new Headers();
        headers.append("content-type", "application/json");
        return this._http.post('edit_data/visitor_edit',JSON.stringify(visitor_data),{headers : headers})
        .map(res => res.json());
    }

}