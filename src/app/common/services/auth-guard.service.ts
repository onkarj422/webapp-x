import {switchMap} from 'rxjs/operators';
import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from './session.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { CryptService } from './crypt.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private session: SessionService, private router: Router, private crypt: CryptService) {

	}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let url: string = state.url;
    console.log(url);
    return this.session.checkLogin().pipe(switchMap(
      isLoggedIn => {
        console.log(isLoggedIn);
        if (isLoggedIn) {
          return new BehaviorSubject<boolean>(this.check(url, this.session.userRoleId));
        } else {
          return new BehaviorSubject<boolean>(false);
        }
      }
    ));
  }

  check(stateUrl: string, userRoleId: number): boolean {
    if (stateUrl == "/admin" && userRoleId == 1) {
      return true;
    } else if (stateUrl == "/customer" && userRoleId == 2) {
      return true;
    } else if (stateUrl == "/deliveryman" && userRoleId == 3) {
      return true;
    } else if (stateUrl == "/chief" && userRoleId == 4) {
      return true;
    } else {
      return false;
    }
  }
}
