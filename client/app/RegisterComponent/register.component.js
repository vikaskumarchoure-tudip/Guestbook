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
var register_service_1 = require("../services/register.service");
var RegisterComponent = (function () {
    function RegisterComponent(registerService) {
        this.registerService = registerService;
        this.submitted = false;
        this.title = "Register";
    }
    RegisterComponent.prototype.registerUser = function (event, username, password, cpass) {
        var _this = this;
        var result;
        var newTodo = {
            username: username.value,
            email: password.value,
            password: cpass.value
        };
        result = this.registerService.registerUser(newTodo);
        result.subscribe(function (x) {
            _this.newUsers.push(newTodo);
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'register-form',
        templateUrl: 'app/RegisterComponent/register.component.html',
        providers: [register_service_1.RegisterService]
    }),
    __metadata("design:paramtypes", [register_service_1.RegisterService])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map