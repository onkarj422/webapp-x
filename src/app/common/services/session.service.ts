import { Injectable, Inject } from '@angular/core';
import { LocalStorage, SessionStorage, StorageProperty } from 'h5webstorage';
import { CryptService } from './crypt.service';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class SessionService {

	@StorageProperty({ storage: 'Session' }) public userRole: string = null;
	@StorageProperty({ storage: 'Session' }) public userData: any = null;
  @StorageProperty({ storage: 'Session' }) public isLoggedIn: boolean = false;
  @StorageProperty({ storage: 'Local' }) public keepLoggedIn: boolean = true;
  @StorageProperty({ storage: 'Local' }) private accessData: any = null;

  constructor(
    private localStore: LocalStorage,
    private sessionStore: SessionStorage,
    private apiService: HttpService,
    private auth: AuthService,
    private crypt: CryptService
  ) { }

  sessionServiceInit() {
    if (this.keepLoggedIn) {
      console.log("Login is persistent");
      if (this.isLoggedIn) {
        return;
      } else {
        this.start(this.accessData);
      }
    } else {
      this.end();
    }
  }

  start(data) {
  	this.apiService.apiSessionInit(data).subscribe(
  		data => {
        let role: string = this.crypt.encrypt(this.getUserRole(data.userRoleId));
        this.userData = data;
        this.isLoggedIn = true;
        this.userRole = role;
        this.accessData = {
          'email': data.Email,
          'userRole': role,
          'userId': data.userId
        };
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

  togglekeepLoggedIn(toggle: boolean) {
    !this.keepLoggedIn;
  }

  checkLogin(): Observable<any> {
    let data = {
      "isLoggedIn": this.isLoggedIn,
      "userRole": this.userRole
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

  end() {
    this.sessionStore.clear();
    this.localStore.clear();
  }
}
