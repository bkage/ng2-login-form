import { RouterModule } from "@angular/router";
import {LoginformComponent} from "./loginform/loginform.component";
import {PanelComponent} from './panel'
import { UserLoginService } from './userlogin.service';

export const AF_ROUTES = [
    {
      path: '',
      component: LoginformComponent
    },
    {
      path: 'panel',
      component: PanelComponent,
      canActivate: [UserLoginService]
    }
];

export const ROUTER = RouterModule.forRoot(AF_ROUTES);
