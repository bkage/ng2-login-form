import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { LoginformComponent } from './loginform/loginform.component';
import { PanelComponent } from './panel/panel.component';

import { ROUTER } from './app.routes';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    PanelComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    ROUTER
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
