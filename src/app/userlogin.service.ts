import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {Md5} from 'ts-md5/dist/md5';

//dev defined
import { User } from './loginform/user';


const SALT = "thisIsMySalt";
@Injectable()
export class UserLoginService {
    //simple temp salt for another layer of security

    logIn(userToLogIn: User, userInDB: User){
        //hash input password
        let passMd5 = new Md5();
        let hashedPass = passMd5.appendStr(userToLogIn.getPassword()).appendStr(SALT).end().toString();

        if(hashedPass.toUpperCase() == userInDB.getPassword().toUpperCase()){
            //password correct, login user to SessionStorage
            //sessionStorage.setItem('loggedKey', Md5.hashStr(SALT).toString()); //generate md5 hash from current salt string
            sessionStorage.setItem('loggedKey', 'true');
            sessionStorage.setItem('username', userToLogIn.username);
            console.log('Logged in!!');
            console.log();
            return true;
        }
        else{
            console.log('Wrong password');
            return false;
        }
    }
    logOut(){
        sessionStorage.removeItem('loggedKey');
        sessionStorage.removeItem('username');
        console.log('LoggedOut');
    }


}
//class for canActivate method (protected links guard)
@Injectable()
export class Permission implements CanActivate{
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        //return (sessionStorage.getItem('loggedKey') !== null && sessionStorage.getItem('loggedKey') === Md5.hashStr(SALT).toString());
        return sessionStorage.getItem('loggedKey') == 'true';
    }
}
