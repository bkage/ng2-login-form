import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {Md5} from 'ts-md5/dist/md5';

//dev defined
import { User } from './loginform/user';

@Injectable()
export class UserLoginService implements CanActivate {
    //simple temp salt for another layer of security
    private SALT = "thisIsMySalt";

    logIn(userToLogIn: User, userInDB: User){
        //hash input password
        let passMd5 = new Md5();
        let hashedPass = passMd5.appendStr(userToLogIn.getPassword()).appendStr(this.SALT).end().toString();

        if(hashedPass.toUpperCase() == userInDB.getPassword().toUpperCase()){
            //password correct, login user to SessionStorage
            sessionStorage.setItem('loggedKey', Md5.hashStr(this.SALT).toString()); //generate md5 hash from current salt string
            sessionStorage.setItem('username', userToLogIn.username);
            console.log('Logged in!!');
            return true;
        }
        else{
            console.log('Wrong password');
            return false;
        }
    }
    logOut(){
        sessionStorage.removeItem('logged');
        sessionStorage.removeItem('username');
        console.log('LoggedOut');
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        return (sessionStorage.getItem('loggedKey') === null || sessionStorage.getItem('loggedKey') !== Md5.hashStr(this.SALT).toString());
    }

}
