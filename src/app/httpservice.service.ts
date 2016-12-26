import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class HttpService{

  constructor(private http: Http) { }
  private userResponse;
  getUserList(callbackFn){
     this.http.get('http://localhost:3000/users').map((response: Response) => response.json()).subscribe(callbackFn);
  }

}
