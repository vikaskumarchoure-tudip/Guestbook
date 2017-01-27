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
var forms_1 = require("@angular/forms");
var dashboard_service_1 = require("../services/dashboard.service");
var router_1 = require("@angular/router");
var editvisitor_service_1 = require("../services/editvisitor.service");
var DashboardComponent = (function () {
    function DashboardComponent(formBuilder, dashboardService, router) {
        this.formBuilder = formBuilder;
        this.dashboardService = dashboardService;
        this.router = router;
        this.useremail = localStorage.getItem("host_email");
        this.username = localStorage.getItem("host_name");
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dashboardForm = this.formBuilder.group({
            visitorname: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            visitoremail: ['', [forms_1.Validators.required, forms_1.Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            visitorcontact: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.maxLength(12)]],
            visitorindate: ['', [forms_1.Validators.required,]],
            visitorintime: ['', [forms_1.Validators.required]]
        });
        //this.user_email = this.savedUser.user_email;
        //alert(this.savedUser.users_logged);
        //console.log("User"+this.savedUser.users_logged);
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
            visitor_indate: visitorintime.value,
            visitor_intime: visitorouttime.value,
            visitor_outtime: "",
            visitor_host: this.useremail,
            visitor_host_name: this.username
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
        //alert("yet to be done..." + saved_data._id);
        localStorage.setItem("current_visitor_data_name", saved_data.visitor_name);
        localStorage.setItem("current_visitor_data_email", saved_data.visitor_email);
        localStorage.setItem("current_visitor_data_contact", saved_data.visitor_contact);
        localStorage.setItem("current_visitor_data_indate", saved_data.visitor_indate);
        localStorage.setItem("current_visitor_data_intime", saved_data.visitor_intime);
        localStorage.setItem("current_visitor_data_host", saved_data.visitor_host);
        this.router.navigate(['editvisitor']);
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
    DashboardComponent.prototype.searchVisitor = function (event, search_data) {
        //console.log("ans is ",this.saved_datas[3].visitor_name.search("Prashant"));
        var _this = this;
        this.searched_data = [];
        this.saved_datas.forEach(function (element) {
            if (element.visitor_name.search(search_data.value) == 0) {
                _this.searched_data.push(element);
            }
        });
        //console.log("The return ans is ",this.searched_data);
    };
    DashboardComponent.prototype.onLogOut = function () {
        localStorage.removeItem("host_email");
        localStorage.removeItem("host_name");
        this.router.navigate(['']);
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'dashboard-form',
        templateUrl: './dashboard.component.html',
        providers: [dashboard_service_1.DashboardService, editvisitor_service_1.EditVisitor]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, dashboard_service_1.DashboardService, router_1.Router])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map