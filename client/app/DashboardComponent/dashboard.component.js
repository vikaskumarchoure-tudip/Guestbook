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
var register_service_1 = require("../services/register.service");
var DashboardComponent = (function () {
    function DashboardComponent(formBuilder, dashboardService, router, registerService) {
        this.formBuilder = formBuilder;
        this.dashboardService = dashboardService;
        this.router = router;
        this.registerService = registerService;
        this.is_admin = false;
        this.useremail = localStorage.getItem("host_email");
        this.username = localStorage.getItem("host_name");
        this.userrole = localStorage.getItem("host_role");
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (localStorage.getItem("host_email") == undefined && localStorage.getItem("host_name") == undefined) {
            this.router.navigate(['']);
        }
        if (this.userrole == "admin") {
            this.is_admin = true;
        }
        else {
            this.is_admin = false;
        }
        this.addForm = this.formBuilder.group({
            useraddname: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            useraddemail: ['', [forms_1.Validators.required, forms_1.Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            useraddpassword: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]]
        });
        this.dashboardForm = this.formBuilder.group({
            visitorname: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            visitoremail: ['', [forms_1.Validators.required, forms_1.Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            visitorcontact: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.pattern("[1-9][0-9]{9}")]],
        });
        var res;
        var visitoruser = {
            visitor_host: this.useremail,
            visitor_role: this.userrole
        };
        this.saved_datas = [];
        this.dashboardService.getSavedData(visitoruser).subscribe(function (saved_data) { _this.saved_datas = saved_data; });
    };
    //add visitor
    DashboardComponent.prototype.addVisitor = function (event, visitorname, visitoremail, visitorcontact) {
        var _this = this;
        var date = new Date();
        var result;
        var visitor = {
            visitor_name: visitorname.value.toString().trim(),
            visitor_email: visitoremail.value.toString().trim(),
            visitor_contact: visitorcontact.value.toString().trim(),
            visitor_indate: date.getDate() + "-" + date.getMonth() + 1 + "-" + date.getFullYear(),
            visitor_intime: new Date().toTimeString().split(" ")[0],
            visitor_outtime: "",
            visitor_host: this.useremail,
            visitor_host_name: this.username
        };
        if (localStorage.getItem("host_email") == undefined && localStorage.getItem("host_name") == undefined) {
            this.router.navigate(['']);
        }
        else {
            result = this.dashboardService.setSavedData(visitor);
            result.subscribe(function (x) {
                _this.saved_datas.unshift(visitor);
            });
        }
        visitorname.value = "";
        visitoremail.value = "";
        visitorcontact.value = "";
    };
    //edit visitor
    DashboardComponent.prototype.editVisitor = function (saved_data) {
        localStorage.setItem("current_visitor_data_name", saved_data.visitor_name);
        localStorage.setItem("current_visitor_data_email", saved_data.visitor_email);
        localStorage.setItem("current_visitor_data_contact", saved_data.visitor_contact);
        localStorage.setItem("current_visitor_data_indate", saved_data.visitor_indate);
        localStorage.setItem("current_visitor_data_intime", saved_data.visitor_intime);
        localStorage.setItem("current_visitor_data_host", saved_data.visitor_host);
        localStorage.setItem("current_visitor_data_host_name", saved_data.visitor_host_name);
        this.router.navigate(['editvisitor']);
    };
    //delete visitor
    DashboardComponent.prototype.deleteVisitor = function (saved_data) {
        var saved_data_all = this.saved_datas;
        console.log(saved_data._id);
        this.dashboardService.deleteVisitor(saved_data._id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < saved_data_all.length; i++) {
                    if (saved_data_all[i]._id == saved_data._id) {
                        saved_data_all.splice(i, 1);
                    }
                }
            }
        });
    };
    //search visitor
    DashboardComponent.prototype.searchVisitor = function (event, search_data) {
        var _this = this;
        this.searched_data = [];
        var str1 = search_data.value.toString().toLowerCase().trim();
        this.saved_datas.forEach(function (element) {
            var str2 = element.visitor_name.toString().trim();
            if (element.visitor_name.toString().toLowerCase().search(search_data.value) == 0) {
                _this.searched_data.push(element);
            }
        });
    };
    DashboardComponent.prototype.addUser = function (event, username, useremail, userrole, userpassword) {
        //console.log(username.value + "," + useremail.value + "," + userpassword.value +","+userrole.value);
        var result;
        var addUser = {
            username: username.value.toString().trim(),
            email: useremail.value.toString().trim(),
            password: userpassword.value.toString().trim(),
            role: userrole.value
        };
        result = this.registerService.registerUser(addUser);
        result.subscribe(function (x) {
            console.log(x);
            alert("User added Successfully");
            username.value = "";
            useremail.value = "";
            userpassword.value = "";
        });
    };
    //Log Out receptionist
    DashboardComponent.prototype.onLogOut = function () {
        localStorage.removeItem("host_email");
        localStorage.removeItem("host_name");
        localStorage.removeItem("host_role");
        this.router.navigate(['']);
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'dashboard-form',
        templateUrl: './dashboard.component.html',
        providers: [dashboard_service_1.DashboardService, editvisitor_service_1.EditVisitor, register_service_1.RegisterService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, dashboard_service_1.DashboardService, router_1.Router, register_service_1.RegisterService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map