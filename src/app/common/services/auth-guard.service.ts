import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from './session.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardAdmin implements CanActivate {

	constructor(private session: SessionService, private router: Router) {

	}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('AuthGuard#canActivate called');
    let url: string = state.url;
    console.log(url);
    return this.session.checkLogin().switchMap(
      data => {
        console.log(data);
        if (data.isLoggedIn) {
          return ((data.userRoleId === 1) ? Observable.of(true) : Observable.of(false));
        } else {
          return Observable.of(false);
        }
      }
    );
  }
}

@Injectable()
export class AuthGuardCustomer implements CanActivate {

  constructor(private session: SessionService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('AuthGuard#canActivate called');
    let url: string = state.url;
    console.log(url);
    return this.session.checkLogin().switchMap(
      data => {
        if (data.isLoggedIn) {
          return ((data.userRole === 2) ? Observable.of(true) : Observable.of(false));
        } else {
          return Observable.of(false);
        }
      }
    );
  }
}

@Injectable()
export class AuthGuardDeliveryMan implements CanActivate {

  constructor(private session: SessionService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('AuthGuard#canActivate called');
    let url: string = state.url;
    console.log(url);
    return this.session.checkLogin().switchMap(
      data => {
        if (data.isLoggedIn) {
          return ((data.userRole === 3) ? Observable.of(true) : Observable.of(false));
        } else {
          return Observable.of(false);
        }
      }
    );
  }
}

@Injectable()
export class AuthGuardChief implements CanActivate {

  constructor(private session: SessionService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('AuthGuard#canActivate called');
    let url: string = state.url;
    console.log(url);
    return this.session.checkLogin().switchMap(
      data => {
        if (data.isLoggedIn) {
          return ((data.userRole === 4) ? Observable.of(true) : Observable.of(false));
        } else {
          return Observable.of(false);
        }
      }
    );
  }
}
