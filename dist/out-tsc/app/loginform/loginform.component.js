var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "./user";
import { HttpService } from "../httpservice.service";
import { UserLoginService } from '../userlogin.service';
var LoginformComponent = (function () {
    function LoginformComponent(httpService, loginService, router) {
        var _this = this;
        this.httpService = httpService;
        this.loginService = loginService;
        this.router = router;
        this.defaultUser = new User('', '', '');
        this.httpService.getUserList(function (data) { return _this.usersArray = data; });
    }
    LoginformComponent.prototype.onSubmit = function (form) {
        var _this = this;
        var userFromDB = this.usersArray.find(function (user) {
            return user.username === _this.currentUser.username;
        });
        if (typeof userFromDB !== 'undefined') {
            var userToLogIn = new User(userFromDB.username, userFromDB.password, userFromDB.email);
            if (this.loginService.logIn(this.currentUser, userToLogIn)) {
                this.formMessage = '';
                this.router.navigate(['panel']);
            }
            else {
                this.formMessage = 'Wrong password';
            }
        }
        else {
            this.formMessage = 'No user with that username';
            return false;
        }
    };
    LoginformComponent.prototype.ngOnInit = function () {
        if (sessionStorage.getItem('username') !== null && sessionStorage.getItem('loggedKey') !== null) {
            this.isLoggedIn = true;
            this.currentUser = new User(sessionStorage.getItem('username'), '', '');
            this.formMessage = 'You are already logged in';
        }
        else {
            this.isLoggedIn = false;
            this.currentUser = this.defaultUser;
            this.formMessage = '';
        }
    };
    return LoginformComponent;
}());
LoginformComponent = __decorate([
    Component({
        selector: 'af-loginform',
        templateUrl: './loginform.component.html',
        providers: [HttpService, UserLoginService]
    }),
    __metadata("design:paramtypes", [HttpService, UserLoginService, Router])
], LoginformComponent);
export { LoginformComponent };
//# sourceMappingURL=../../../../src/app/loginform/loginform.component.js.map