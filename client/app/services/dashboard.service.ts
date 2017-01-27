import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class DashboardService {

    constructor(private _http: Http) {
    }
   
   
    editSavedData(dash_data) {
        var headers = new Headers();
        headers.append("content-type", "application/json");
        return this._http.post('api/v1/visitor_edit', JSON.stringify(dash_data), { headers: headers }).map(res => res.json());
    }
   
    getSavedData(visitor_unique) {
        var headers = new Headers();
        headers.append("content-type", "application/json");
        return this._http.post('api/v1/visitor_data_unique', JSON.stringify(visitor_unique), { headers: headers }).map(res => res.json());
    }

    setSavedData(dash_data) {
        var headers = new Headers();
        headers.append("content-type", "application/json");
        return this._http.post('api/v1/visitor_data', JSON.stringify(dash_data), { headers: headers }).map(res => res.json());

    }

    deleteVisitor(id) {
        return this._http.delete('/api/v1/visitor_data/' + id).map(res => res.json());
    }
}