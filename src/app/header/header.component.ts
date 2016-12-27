import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'af-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    private isLoggedIn: boolean = false;
    private currentUser: string;

    constructor(private router: Router) {
        router.events.forEach((event: Event) => {
            if(event instanceof NavigationStart) {
                this.isLoggedIn = sessionStorage.getItem('loggedKey') !== null;
                this.currentUser = sessionStorage.getItem('username');
            }
        });
    }
}
