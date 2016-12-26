import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

//dev defined
import { User } from './loginform/user';

@Injectable()
export class UserLoginService {
    //simple temp salt for another layer of security
    private SALT = "thisIsMySalt";

    logIn(userToLogIn: User, userInDB: User){
        //hash input password
        let md5 = new Md5();
        let hashedPass = md5.appendStr(userToLogIn.getPassword()).appendStr(this.SALT).end();
        console.log(md5.appendStr(this.SALT).end());
        console.log(md5.appendStr(this.SALT).end());

        if(hashedPass === userInDB.getPassword()){
            //password correct, login user to SessionStorage
            sessionStorage.setItem('loggedKey', 'true');
            sessionStorage.setItem('username', userToLogIn.username);

            return true;
        }
        else{
            if(JSON.parse(sessionStorage.getItem('logged')) !== true){  //if user haven't logged before
                return false;
            }
            else{
                console.log('You are already logged in!');
            }
        }
    }
    logOut(userToLogout: User){
        sessionStorage.removeItem('logged')
    }
    checkAccess(user: User){

    }

}
