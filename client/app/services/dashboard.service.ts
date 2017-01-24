import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class DashboardService {

    constructor(private _http: Http) {

    }

    getSavedDatas(visitor_uq) {
        var headers = new Headers();
        headers.append("content-type", "application/json");
        return this._http.post('api/v1/visitor_datauq', JSON.stringify(visitor_uq), { headers: headers }).map(res => res.json());
    }

    setSavedDatas(dash_data) {
        var headers = new Headers();
        headers.append("content-type", "application/json");
        return this._http.post('api/v1/visitor_data', JSON.stringify(dash_data), { headers: headers }).map(res => res.json());
    }

    editSavedDatas(dash_data) {
        var headers = new Headers();
        headers.append("content-type", "application/json");
        return this._http.post('api/v1/visitors', JSON.stringify(dash_data), { headers: headers }).map(res => res.json());
    }


    deleteVisitor(id) {
        return this._http.delete('/api/v1/visitor_data/' + id).map(res => res.json());
    }
}