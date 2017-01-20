import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map' ;

@Injectable()

export class TodosService{

    constructor(private _http:Http){

    }

    getTodos(){
        return this._http.get('api/v1/todos').map(res => res.json());
    }

    saveTodos(todos){
        var headers = new Headers();
        headers.append("content-type","application/json");
        return this._http.post('api/v1/todo',JSON.stringify(todos),{headers:headers}).map(res => res.json());
    }

}