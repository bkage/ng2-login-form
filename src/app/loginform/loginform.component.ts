import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';


//dev defined
import {User} from "./user";
import {HttpService} from "../httpservice.service";
import { UserLoginService, SALT } from '../userlogin.service';

@Component({
  selector: 'af-loginform',
  templateUrl: './loginform.component.html',
  providers: [HttpService, UserLoginService]
})
export class LoginformComponent implements OnInit {

    private defaultUser: User = new User('', '', '');
    private currentUser: User;
    private usersArray: any;
    private formMessage: string;
    private isLoggedIn: boolean;

    onSubmit(form){
        //search for username in DB
        let userFromDB = this.usersArray.find((user) => {
            return user.username === this.currentUser.username;
        });
        if(typeof userFromDB !== 'undefined'){ //if username exist in DB
            //create temp user that wish to log in
            let userToLogIn: User = new User(userFromDB.username, userFromDB.password, userFromDB.email);

            //check for pass and set session vars
            if(this.loginService.logIn(this.currentUser, userToLogIn)){
                this.formMessage = '';
                this.router.navigate(['panel']);
            }
            else{
                this.formMessage = 'Wrong password';
            }
        }
        else{
            this.formMessage = 'No user with that username';
            return false;
        }
    }

    constructor(private httpService: HttpService, private loginService: UserLoginService, private router: Router) {
        this.httpService.getUserList((data: any) => this.usersArray = data);
    }

    ngOnInit() {
        if(sessionStorage.getItem('username') !== null && sessionStorage.getItem('loggedKey') !== null){
            this.isLoggedIn = true;
            this.currentUser = new User(sessionStorage.getItem('username'), '','');
            this.formMessage = 'You are already logged in';
        }
        else{
            this.isLoggedIn = false;
            this.currentUser = this.defaultUser;
            this.formMessage = '';
        }


    }

}
