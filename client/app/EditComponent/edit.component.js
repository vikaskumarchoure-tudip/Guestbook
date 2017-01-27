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
var EditComponent = (function () {
    function EditComponent(formBuilder, dashService, editService, router) {
        this.formBuilder = formBuilder;
        this.dashService = dashService;
        this.editService = editService;
        this.router = router;
        this.useremail = localStorage.getItem("host_email");
    }
    EditComponent.prototype.ngOnInit = function () {
        var visitor_data_name = localStorage.getItem("current_visitor_data_name");
        var visitor_data_email = localStorage.getItem("current_visitor_data_email");
        var visitor_data_contact = localStorage.getItem("current_visitor_data_contact");
        var visitor_data_indate = localStorage.getItem("current_visitor_data_indate");
        var visitor_data_intime = localStorage.getItem("current_visitor_data_intime");
        var visitor_data_host = localStorage.getItem("current_visitor_data_host");
        this.editForm = this.formBuilder.group({
            visitor_name_edit: [visitor_data_name, forms_1.Validators.required],
            visitor_email_edit: [visitor_data_email, [forms_1.Validators.required, forms_1.Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            visitor_contact_edit: [visitor_data_contact, forms_1.Validators.required],
            visitor_indate_edit: [visitor_data_indate],
            visitor_intime_edit: [visitor_data_intime, forms_1.Validators.required],
            visitor_outtime_edit: ['', forms_1.Validators.required]
        });
    };
    EditComponent.prototype.editVisitor = function (event, visitor_name, visitor_email, visitor_contact, visitor_indate, visitor_intime, visitor_outtime) {
        //console.log(visitor_name.value+visitor_email.value+visitor_contact.value+visitor_intime.value+visitor_outtime.value);
        var result;
        var visitor_data = {
            visitor_name: visitor_name.value,
            visitor_email: visitor_email.value,
            visitor_contact: visitor_contact.value,
            visitor_indate: visitor_indate.value,
            visitor_intime: visitor_intime.value,
            visitor_outtime: visitor_outtime.value,
            visitor_host: this.useremail,
            visitor_host_name: localStorage.getItem("host_name")
        };
        //console.log("the data is : " + visitor_data);
        result = this.dashService.editSavedDatas(visitor_data);
        result.subscribe(function (x) {
            //console.log(x);
        });
        this.router.navigate(['dashboard']);
        //var res = this.editService.editVisitor(visitor_data);
        /*
                localStorage.removeItem("current_visitor_data_name");
                localStorage.removeItem("current_visitor_data_email");
                localStorage.removeItem("current_visitor_data_contact");
                localStorage.removeItem("current_visitor_data_indate");
                localStorage.removeItem("current_visitor_data_intime");
                localStorage.removeItem("current_visitor_data_host");
                //console.log(visitor_name.value+","+visitor_email.value+","+visitor_contact.value+","+visitor_indate.value+","+visitor_intime.value+","+visitor_outtime.value);
                this.router.navigate(['dashboard']);
        */
    };
    return EditComponent;
}());
EditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit-comp',
        templateUrl: './edit.component.html',
        providers: [editvisitor_service_1.EditVisitor, dashboard_service_1.DashboardService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, dashboard_service_1.DashboardService, editvisitor_service_1.EditVisitor, router_1.Router])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map