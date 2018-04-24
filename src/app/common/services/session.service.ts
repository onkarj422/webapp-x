import { Injectable, Inject } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class SessionService {

	public userRole: string;
	public userData: any;
  public isLoggedIn: boolean = false;
  public redirectUrl: string;

  constructor(
    private localStore: LocalStorageService,
    private sessionStore: SessionStorageService,
    private apiService: HttpService,
    private auth: AuthService
  ) {
    localStore.store('keepLoggedIn', true);
  }

  sessionServiceInit() {
    if (this.localStore.retrieve('keepLoggedIn')) {
      if (this.sessionStore.retrieve('isLoggedIn')) {
        return;
      } else {
        this.start(this.localStore.retrieve('accessData'));
      }
    } else { 
      this.sessionStore.store('isLoggedIn', false);
    }
  }

  start(data) {
  	this.apiService.apiSessionInit(data).subscribe(
  		data => {
        this.sessionStore.store('userData', JSON.stringify(data));
        this.sessionStore.store('isLoggedIn', true);
        this.sessionStore.store('userRoleId', data.userRoleId);
        this.userRole = data.userRole;
        this.userData = data;
        this.isLoggedIn = true;
        let sessionData = {
          'email': data.Email,
          'userRoleId': data.userRoleId,
          'userId': data.userId
        };
        this.localStore.store('accessData', JSON.stringify(sessionData));
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

  togglekeepLoggedIn(toggle: boolean) {
    this.localStore.store('keepLoggedIn', toggle);
  }

  checkLogin(): Observable<any> {
    const sessionLogin = this.sessionStore.retrieve('isLoggedIn');
    const isLoggedIn: boolean = new Boolean(sessionLogin).valueOf();
    let data = {
      "isLoggedIn": isLoggedIn,
      "userRoleId": this.sessionStore.retrieve("userRoleId")
    };
    return Observable.of(data);
  }

  getUserRole(userRoleId) {
    let role: string;
    switch(userRoleId) {
      case 1: {
        role = "admin";
        break;
      }
      case 2: {
        role = "customer";
        break;
      }
      case 3: {
        role = "deliveryman";
        break;
      }
      case 4: {
        role = "chief";
        break;
      }
    }
    return role;
  }

}
