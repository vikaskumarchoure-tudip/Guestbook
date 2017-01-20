"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var todos_component_1 = require("./components/todos.component");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/http");
var login_component_1 = require("./LoginComponent/login.component");
var register_component_1 = require("./RegisterComponent/register.component");
var users_routing_1 = require("./Routing/users.routing");
var dashboard_component_1 = require("./DashboardComponent/dashboard.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, platform_browser_1.BrowserModule, forms_1.FormsModule, forms_2.ReactiveFormsModule,
            router_1.RouterModule.forRoot(users_routing_1.ContactRoutes)
        ],
        declarations: [app_component_1.AppComponent, todos_component_1.TodosComponent, login_component_1.LoginComponent, register_component_1.RegisterComponent, dashboard_component_1.DashboardComponent],
        bootstrap: [app_component_1.AppComponent],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map