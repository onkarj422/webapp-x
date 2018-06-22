import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage, SessionStorage, StorageProperty } from 'h5webstorage';
import { CryptService } from './crypt.service';
import { HttpService } from './http.service';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class SessionService {

	public userRoleId: number = null;
	public userData: any = null;
  public get userId() { return this.userData.id; }
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @StorageProperty({ storage: 'Session'}) public session: boolean = false;
  @StorageProperty({ storage: 'Local' }) public keepLoggedIn: boolean = true;
  @StorageProperty({ storage: 'Local' }) private accessData: any = null;

  constructor(
    private localStore: LocalStorage,
    private sessionStore: SessionStorage,
    private apiService: HttpService,
    private auth: AuthService,
    private crypt: CryptService,
    private router: Router
  ) { 
    this.sessionServiceInit();
  }

  sessionServiceInit() {
    if (this.keepLoggedIn && this.accessData != null) {
      console.log("Login is persistent");
      if (this.session && this.userData != null) {
        return;
      } else {
        console.log("Starting session..");
        let data: any = this.accessData;
        let userRoleHash = this.accessData['userRole'];
        data['userRoleId'] = this.getUserRoleIdFromHash(userRoleHash);
        this.start(data);
      }
    } else {
      this.end();
    }
  }

  start(data) {
  	this.apiService.post(data, "access").subscribe(
  		data => {
        let role: string = this.crypt.encrypt(this.getUserRole(data.userRoleId));
        this.userData = data;
        this.session = true;
        this.isLoggedIn.next(true);
        this.userRoleId = data.userRoleId;
        this.accessData = {
          'email': data.email,
          'userRole': role,
          'userId': data.id
        };
  		},
  		error => {
  			console.log(error);
  		},
      () => {
        this.router.navigateByUrl(this.navigate());
      }
  	);
  }

  togglekeepLoggedIn(toggle: boolean) {
    !this.keepLoggedIn;
  }

  checkLogin(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  getUserRole(userRoleId): string {
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

  getUserRoleIdFromHash(userRoleHash): number {
    if (this.crypt.compare(userRoleHash,"admin")) {
      return 1;
    } else if (this.crypt.compare(userRoleHash,"customer")) {
      return 2;
    } else if (this.crypt.compare(userRoleHash,"deliveryman")) {
      return 3;
    } else if (this.crypt.compare(userRoleHash,"chief")) {
      return 4;
    }
  }

  navigate(): string {
    let route: string;
    switch(this.userRoleId) {
      case 1: {
        route = "/admin";
        break; 
      }
      case 2: {
        route = "/home";
        break; 
      }
      case 3: {
        route = "/admin/delivery";
        break; 
      }
      case 4: {
        route = "/admin/food";
        break; 
      }
    }
    return route;
  }

  end() {
    this.userData = null;
    this.userRoleId = null;
    this.isLoggedIn.next(false);
    this.sessionStore.clear();
    this.localStore.clear();
  }
}
