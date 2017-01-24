import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class EditService {

    constructor(private _http: Http) {

    }

editSavedDatas(dash_data) {
        var headers = new Headers();
        headers.append("content-type", "application/json");
        return this._http.post('api/v1/visitors', JSON.stringify(dash_data), { headers: headers }).map(res => res.json());
    }

}