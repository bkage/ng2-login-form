import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { SessionStorage } from 'angular2-localstorage/WebStorage';

//dev defined
import {User} from "./user";
import {HttpService} from "../httpservice.service";

@Component({
  selector: 'af-loginform',
  templateUrl: './loginform.component.html',
  providers: [HttpService]
})
export class LoginformComponent implements OnInit {
  onSubmit(form){
    let checkForUsername = this.usersArray.filter((user) => {
        return user.username === this.currentUser.username;
    });
    if(checkForUsername.length > 0){ //if username exist in DB
        //check for pass1
        if(checkForUsername[0].password === this.currentUser.getPassword()){
            console.log('LogIn: Username and password correct');
        }
        else{
            console.log('LogIn Failed: Password incorrect');
        }
    }
    else{
        console.log('LogIn Failed: No such user in database');
    }
  }


  private defaultUser: User = new User('', '', '');
  private currentUser: User;
  private usersArray: any;

  constructor(private httpService: HttpService) {
    this.httpService.getUserList((data: any) => this.usersArray = data);
  }

  ngOnInit() {
    this.currentUser = this.defaultUser;
  }

}
