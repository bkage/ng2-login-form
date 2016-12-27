import { Component, OnInit } from '@angular/core';

import { UserLoginService} from '../userlogin.service';

@Component({
  selector: 'af-panel',
  templateUrl: './panel.component.html',
  styles: [`
    .col-md-12{
        display:flex; 
        align-items:center;
    }
  `]
})
export class PanelComponent implements OnInit {

  constructor( private loginService: UserLoginService) { }

  logOut(){
      this.loginService.logOut();
  }

  ngOnInit() {
  }

}
