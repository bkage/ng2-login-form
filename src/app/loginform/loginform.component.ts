import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';


//dev defined
import {User} from "./user";
import {HttpService} from "../httpservice.service";
import { UserLoginService } from '../userlogin.service';

@Component({
  selector: 'af-loginform',
  templateUrl: './loginform.component.html',
  providers: [HttpService, UserLoginService]
})
export class LoginformComponent implements OnInit {

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
            console.log('logedin');
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

  private defaultUser: User = new User('', '', '');
  private currentUser: User;
  private usersArray: any;
  private formMessage: string;

  constructor(private httpService: HttpService, private loginService: UserLoginService, private router: Router) {
    this.httpService.getUserList((data: any) => this.usersArray = data);
  }

  ngOnInit() {
    this.currentUser = this.defaultUser;
  }

}
