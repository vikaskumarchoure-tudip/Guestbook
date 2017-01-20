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
var saveduser_1 = require("../saveduser");
var dashboard_service_1 = require("../services/dashboard.service");
var DashboardComponent = (function () {
    function DashboardComponent(savedUser, dashboardService) {
        this.savedUser = savedUser;
        this.dashboardService = dashboardService;
        this.useremail = "vikaskumar@gmail.com";
    }
    DashboardComponent.prototype.ngOnInit = function () {
        //this.user_email = this.savedUser.user_email;
        //alert(this.savedUser.users_logged);
        //console.log("User"+this.savedUser.users_logged);
        var _this = this;
        var res;
        var visitoruq = {
            visitor_host: this.useremail
        };
        this.saved_datas = [];
        this.dashboardService.getSavedDatas(visitoruq).subscribe(function (saved_data) { _this.saved_datas = saved_data; });
    };
    DashboardComponent.prototype.addVisitor = function (event, visitorname, visitoremail, visitorcontact, visitorintime, visitorouttime) {
        var _this = this;
        //console.log(visitorname.value+""+visitoremail.value+""+visitorcontact.value+""+visitorintime.value+""+visitorouttime.value);        
        var result;
        var visitor = {
            visitor_name: visitorname.value,
            visitor_email: visitoremail.value,
            visitor_contact: visitorcontact.value,
            visitor_intime: visitorintime.value,
            visitor_outtime: visitorouttime.value,
            visitor_host: this.useremail
        };
        result = this.dashboardService.setSavedDatas(visitor);
        result.subscribe(function (x) {
            _this.saved_datas.push(visitor);
        });
        visitorname.value = "";
        visitoremail.value = "";
        visitorcontact.value = "";
        visitorintime.value = "";
        visitorouttime.value = "";
    };
    //edit visitor
    DashboardComponent.prototype.editVisitor = function (saved_data) {
        alert("yet to be done..." + saved_data._id);
    };
    //delete visitor
    DashboardComponent.prototype.deleteVisitor = function (saved_data) {
        var saved_datas = this.saved_datas;
        console.log(saved_data._id);
        this.dashboardService.deleteVisitor(saved_data._id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < saved_datas.length; i++) {
                    if (saved_datas[i]._id == saved_data._id) {
                        saved_datas.splice(i, 1);
                    }
                }
            }
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'dashboard-form',
        templateUrl: './dashboard.component.html',
        providers: [saveduser_1.SavedUser, dashboard_service_1.DashboardService]
    }),
    __metadata("design:paramtypes", [saveduser_1.SavedUser, dashboard_service_1.DashboardService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map