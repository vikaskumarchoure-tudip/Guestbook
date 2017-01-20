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
var logindata_1 = require("./logindata");
var login_service_1 = require("../services/login.service");
var saveduser_1 = require("../saveduser");
var LoginComponent = (function () {
    function LoginComponent(formBuilder, loginService, savedUser, router) {
        this.formBuilder = formBuilder;
        this.loginService = loginService;
        this.savedUser = savedUser;
        this.router = router;
        this.login_model = new logindata_1.LoginData('', '');
        this.submitted = false;
        this.logindata = '';
        this.user_email = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]]
        });
    };
    LoginComponent.prototype.onLogin = function (event, username, password) {
        var _this = this;
        var result;
        this.loginUsers = [];
        var newTodo = {
            email: username.value,
            password: password.value
        };
        result = this.loginService.checkLogin(newTodo);
        result.subscribe(function (loginUsers) {
            _this.loginUsers = loginUsers;
            if (loginUsers == null) {
                alert("Please enter correct data");
                username.value = "";
                password.value = "";
            }
            else {
                _this.savedUser.users_logged = "" + loginUsers.text;
                _this.router.navigate(['dashboard']);
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login-form',
        templateUrl: 'app/LoginComponent/login.component.html',
        providers: [login_service_1.LoginService, saveduser_1.SavedUser]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, login_service_1.LoginService, saveduser_1.SavedUser, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map