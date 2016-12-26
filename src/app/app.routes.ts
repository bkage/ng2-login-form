/**
 * Created by BernardKlatkaSquiz on 24/12/16.
 */

import { RouterModule } from "@angular/router";
import {LoginformComponent} from "./loginform/loginform.component";
import {PanelComponent} from './panel'
export const AF_ROUTES = [
    {
      path: '',
      component: LoginformComponent
    },
    {
      path: 'panel',
      component: PanelComponent
    }
];

export const ROUTER = RouterModule.forRoot(AF_ROUTES);
