import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from '../userlogin.service';

@Component({
  selector: 'af-header',
  templateUrl: './header.component.html',
  styles: [],
  providers: [UserLoginService]
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserLoginService, private router: Router) { }

  logOut(){
      this.userService.logOut();
      this.router.navigate(['']);
  }
  ngOnInit() {
  }

}
