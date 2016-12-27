import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {Md5} from 'ts-md5/dist/md5';

//dev defined
import { User } from './loginform/user';


export const SALT = "thisIsMySalt";
@Injectable()
export class UserLoginService {
    //simple temp salt for another layer of security
    constructor(private router: Router){}

    logIn(userToLogIn: User, userInDB: User){
        //hash input password
        let passMd5 = new Md5();
        let hashedPass = passMd5.appendStr(userToLogIn.getPassword()).appendStr(SALT).end().toString();

        if(hashedPass.toUpperCase() == userInDB.getPassword().toUpperCase()){
            //password correct, login user to SessionStorage
            sessionStorage.setItem('loggedKey', Md5.hashStr(userToLogIn.username + SALT).toString()); //generate md5 hash from current salt string
            sessionStorage.setItem('username', userToLogIn.username);
            return true;
        }
        else{
            return false;
        }
    }
    logOut(){
        //clear session
        sessionStorage.removeItem('loggedKey');
        sessionStorage.removeItem('username');

        this.router.navigate(['login'])
    }


}
//class for canActivate method (protected links)
@Injectable()
export class Permission implements CanActivate{
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        return sessionStorage.getItem('loggedKey') == Md5.hashStr(sessionStorage.getItem('username') + SALT).toString();
    }
}
