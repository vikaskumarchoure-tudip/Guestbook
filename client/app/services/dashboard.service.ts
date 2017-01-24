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

    editSavedDatas(visitor_edit) {
        var headers = new Headers();
        headers.append("content-type", "application/json");
        console.log("Reached to dashboard service...");
        return this._http.put('/api/v1/visitor_edit', JSON.stringify(visitor_edit), { headers: headers }).map(res => res.json());
    }

    deleteVisitor(id) {
        return this._http.delete('/api/v1/visitor_data/' + id).map(res => res.json());
    }
}