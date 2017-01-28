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
var router_1 = require("@angular/router");
var login_service_1 = require("../services/login.service");
var LoginComponent = (function () {
    function LoginComponent(formBuilder, loginService, router) {
        this.formBuilder = formBuilder;
        this.loginService = loginService;
        this.router = router;
        this.submitted = false;
        this.logindata = '';
        this.user_email = '';
    }
    //Login component loads
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', [forms_1.Validators.required, forms_1.Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]]
        });
    };
    //Login button click event handler
    LoginComponent.prototype.onLogin = function (event, username, password) {
        var _this = this;
        var result;
        this.loginUsers = [];
        var userDetail = {
            email: username.value.toString().trim(),
            password: password.value.toString().trim(),
        };
        result = this.loginService.checkLogin(userDetail);
        result.subscribe(function (loginUsers) {
            _this.loginUsers = loginUsers;
            if (loginUsers.toString() == "User not found") {
                alert("Please enter correct data");
                username.value = "";
                password.value = "";
            }
            else {
                localStorage.setItem('host_email', loginUsers.email);
                localStorage.setItem('host_name', loginUsers.username);
                localStorage.setItem('host_role', loginUsers.role);
                //console.log(""+loginUsers.email);
                _this.router.navigate(['/dashboard']);
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login-form',
        templateUrl: 'app/LoginComponent/login.component.html',
        providers: [login_service_1.LoginService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, login_service_1.LoginService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map