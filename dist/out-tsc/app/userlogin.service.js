var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
export var SALT = "thisIsMySalt";
var UserLoginService = (function () {
    function UserLoginService(router) {
        this.router = router;
    }
    UserLoginService.prototype.logIn = function (userToLogIn, userInDB) {
        var passMd5 = new Md5();
        var hashedPass = passMd5.appendStr(userToLogIn.getPassword()).appendStr(SALT).end().toString();
        if (hashedPass.toUpperCase() == userInDB.getPassword().toUpperCase()) {
            sessionStorage.setItem('loggedKey', Md5.hashStr(userToLogIn.username + SALT).toString());
            sessionStorage.setItem('username', userToLogIn.username);
            return true;
        }
        else {
            return false;
        }
    };
    UserLoginService.prototype.logOut = function () {
        sessionStorage.removeItem('loggedKey');
        sessionStorage.removeItem('username');
        this.router.navigate(['login']);
    };
    return UserLoginService;
}());
UserLoginService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Router])
], UserLoginService);
export { UserLoginService };
var Permission = (function () {
    function Permission() {
    }
    Permission.prototype.canActivate = function (route, state) {
        return sessionStorage.getItem('loggedKey') == Md5.hashStr(sessionStorage.getItem('username') + SALT).toString();
    };
    return Permission;
}());
Permission = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], Permission);
export { Permission };
//# sourceMappingURL=../../../src/app/userlogin.service.js.map