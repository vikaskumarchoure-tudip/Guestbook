"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var DashboardService = (function () {
    function DashboardService(_http) {
        this._http = _http;
    }
    DashboardService.prototype.getSavedDatas = function (visitor_uq) {
        var headers = new http_1.Headers();
        headers.append("content-type", "application/json");
        return this._http.post('api/v1/visitor_datauq', JSON.stringify(visitor_uq), { headers: headers }).map(function (res) { return res.json(); });
    };
    DashboardService.prototype.setSavedDatas = function (dash_data) {
        var headers = new http_1.Headers();
        headers.append("content-type", "application/json");
        return this._http.post('api/v1/visitor_data', JSON.stringify(dash_data), { headers: headers }).map(function (res) { return res.json(); });
    };
    DashboardService.prototype.editSavedDatas = function (edit_data) {
        var headers = new http_1.Headers();
        headers.append("content-type", "application/json");
        return this._http.post('/api/v1/visitors', JSON.stringify(edit_data), { headers: headers }).map(function (res) { return res.json(); });
    };
    DashboardService.prototype.deleteVisitor = function (id) {
        return this._http.delete('/api/v1/visitor_data/' + id).map(function (res) { return res.json(); });
    };
    return DashboardService;
}());
DashboardService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map