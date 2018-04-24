import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from './session.service';
import { Observable } from 'rxjs/Observable';
import { CryptService } from './crypt.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate {

	constructor(private session: SessionService, private router: Router, private crypt: CryptService) {

	}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('AuthGuard#canActivate called');
    let url: string = state.url;
    console.log(url);
    return this.session.checkLogin().switchMap(
      data => {
        console.log(data);
        if (data.isLoggedIn) {
          return ((this.crypt.compare(data.userRole, "admin")) ? Observable.of(true) : Observable.of(false));
        } else {
          return Observable.of(false);
        }
      }
    );
  }
}

@Injectable()
export class AuthGuardCustomer implements CanActivate {

  constructor(private session: SessionService, private router: Router, private crypt: CryptService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('AuthGuard#canActivate called');
    let url: string = state.url;
    console.log(url);
    return this.session.checkLogin().switchMap(
      data => {
        if (data.isLoggedIn) {
          return ((this.crypt.compare(data.userRole, "customer")) ? Observable.of(true) : Observable.of(false));
        } else {
          return Observable.of(false);
        }
      }
    );
  }
}

@Injectable()
export class AuthGuardDeliveryMan implements CanActivate {

  constructor(private session: SessionService, private router: Router, private crypt: CryptService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('AuthGuard#canActivate called');
    let url: string = state.url;
    console.log(url);
    return this.session.checkLogin().switchMap(
      data => {
        if (data.isLoggedIn) {
          return ((this.crypt.compare(data.userRole, "deliveryman")) ? Observable.of(true) : Observable.of(false));
        } else {
          return Observable.of(false);
        }
      }
    );
  }
}

@Injectable()
export class AuthGuardChief implements CanActivate {

  constructor(private session: SessionService, private router: Router, private crypt: CryptService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('AuthGuard#canActivate called');
    let url: string = state.url;
    console.log(url);
    return this.session.checkLogin().switchMap(
      data => {
        if (data.isLoggedIn) {
          return ((this.crypt.compare(data.userRole, "chief")) ? Observable.of(true) : Observable.of(false));
        } else {
          return Observable.of(false);
        }
      }
    );
  }
}
